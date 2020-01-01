﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using MongoDB.Driver;


namespace Bluprintr.Models.data.Interfaces
{
    public class Driver<T> where T : IMongoElement
    {

        private readonly IMongoCollection<T> items;

        public Driver(IBluprintrSettings settings, string collection)
        {
            if (settings != null)
            {
                this.items = new MongoClient(settings.BluprintrDatabaseSettings.MongoDBConnectionString)
                                .GetDatabase(settings.BluprintrDatabaseSettings.DatabaseName)
                                    .GetCollection<T>(collection);
            }
        }

        public IFindFluent<T, T> Get(bool PublicOnly)
        {
            if (PublicOnly)
            {
                return this.items.Find(item => item.IsPublic.Value);
            }
            else
            {
                return this.items.Find(item => true);
            }

        }

        public T Get(string id)
        {
            return this.items.Find<T>(item => item.Id == id).First();
        }

        public void Post(T item)
        {

        }
    }
}