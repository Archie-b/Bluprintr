namespace Bluprintr.Models.Data.Interfaces
{
    using System.Linq;
    using MongoDB.Driver;

    /// <summary>A connection middleware for the mongo database</summary>
    /// <typeparam name="T">A database element type</typeparam>
    public class Driver<T> where T : IMongoElement
    {
        /// <summary>A list of items from the database</summary>
        private readonly IMongoCollection<T> items;

        /// <summary>Initializes a new instance of the <see cref="Driver{T}"/> class.</summary>
        /// <param name="settings">Contains settings for connecting to the database</param>
        /// <param name="collection">The name of the collection in the database that will be accessed</param>
        public Driver(IBluprintrSettings settings, string collection)
        {
            if (settings != null)
            {
                this.items = new MongoClient(settings.BluprintrDatabaseSettings.MongoDBConnectionString)
                                .GetDatabase(settings.BluprintrDatabaseSettings.DatabaseName)
                                    .GetCollection<T>(collection);
            }
        }

        /// <summary>Gets all instances of T from the database</summary>
        /// <param name="publicOnly">Sets whether the returned collection should contain only public elements</param>
        /// <returns>A collection of all items from a database collection</returns>
        public IFindFluent<T, T> Get(bool publicOnly)
        {
            if (publicOnly)
            {
                return this.items.Find(item => item.IsPublic.Value).Sort(Builders<T>.Sort.Descending("DateCreated"));
            }
            else
            {
                return this.items.Find(item => true);
            }
        }

        /// <summary>Gets an element from the database collection that has the provided ID</summary>
        /// <param name="id">The ID of the element to be retrieved</param>
        /// <returns>A database element</returns>
        public T Get(string id)
        {
            var result = this.items.Find(item => item.Id == id).First();
            return result;
        }

        /// <summary>Adds the parsed item to the database</summary>
        /// <param name="item">The element to be added to the database collection</param>
        /// <returns>The ID of the added item</returns>
        public string Post(T item)
        {
            this.items.InsertOne(item);

            return item.Id;
        }

        /// <summary>Updates the specified item in the database</summary>
        /// <param name="item">The element with updated data</param>
        /// <returns>The ID of the updated element</returns>
        public string Update(T item)
        {
            if (this.items.ReplaceOne(Builders<T>.Filter.Eq(s => s.Id, item.Id), item).IsAcknowledged)
            {
                return item.Id;
            }
            else
            {
                return "0";
            }
        }

        /// <summary>Deletes the blueprint with the specified ID</summary>
        /// <param name="id">The ID of the blueprint to be deleted</param>
        /// <returns>Boolean representing the success of the delete</returns>
        public bool Delete(string id)
        {
            return this.items.DeleteOne(Builders<T>.Filter.Eq("Id", id)).IsAcknowledged;
        }
    }
}
