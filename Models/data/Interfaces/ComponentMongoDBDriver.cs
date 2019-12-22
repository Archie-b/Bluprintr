using Microsoft.CodeAnalysis.CSharp.Syntax;
using MoreLinq;
using Newtonsoft.Json;

namespace Bluprintr.Models
{
    using Microsoft.AspNetCore.Mvc;
    using MongoDB.Driver;
    using Newtonsoft.Json.Linq;
    using System;
    using System.Collections.Generic;
    using System.Diagnostics.CodeAnalysis;
    using System.Linq;

    public class ComponentMongoDBDriver : IInterface
    {
        private readonly List<Component> components;

        public ComponentMongoDBDriver(IBluprintrSettings settings)
        {
            if (settings != null)
            {
                this.components = getSubComponents(new List<Component>(),
                    new MongoClient(settings.BluprintrDatabaseSettings.MongoDBConnectionString)
                        .GetDatabase(settings.BluprintrDatabaseSettings.DatabaseName)
                        .GetCollection<Blueprint>(settings.BluprintrDatabaseSettings.BlueprintsCollectionName)
                        .AsQueryable()
                        .Select(b => b.Components)
                        .SelectMany(comp => comp)
                        .ToList()).DistinctBy(comp => comp.Name).ToList();
                this.components.ForEach(comp => comp.Components = null);
            }
        }

        private List<Component> getSubComponents(List<Component> result, List<Component> components)
        {
            foreach (Component comp in components)
            {
                if (comp.Components != null)
                {
                    result.Add(comp);
                    getSubComponents(result, comp.Components);
                }
                else
                {
                    result.Add(comp);
                }
            }
            return result;
        }

        public bool Add(JObject value)
        {
            throw new NotImplementedException();
        }

        public void Delete(string id)
        {
            throw new NotImplementedException();
        }

        public ActionResult Retrieve()
        {
            return new Response(JsonConvert.SerializeObject(this.components));
        }

        public ActionResult Retrieve(string id)
        {
            throw new NotImplementedException();
        }
    }


    public class ComponentComparer : IEqualityComparer<Component>
    {

        public bool Equals([AllowNull] Component x, [AllowNull] Component y)
        {
            return x.Name == y.Name;
        }

        public int GetHashCode([DisallowNull] Component obj)
        {
            return obj.GetHashCode();
        }
    }
}
