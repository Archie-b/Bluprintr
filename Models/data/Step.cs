using Bluprintr.Models.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bluprintr.Models.data
{
    public class Step : IMongoElement
    {
        public string Id { get; set; }
        public bool? IsPublic { get; set; }

        public string Text { get; set; }

        public int StepNumber { get; set; }

        public string Component { get; set; }
    }
}
