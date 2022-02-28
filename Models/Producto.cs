using System;
using System.Collections.Generic;

#nullable disable

namespace GYF_Challenge.Models
{
    public partial class Producto
    {
        public int Id { get; set; }
        public decimal? Precio { get; set; }
        public DateTime? FechaCarga { get; set; }
        public int? Categoria { get; set; }

        public virtual Categoria CategoriaNavigation { get; set; }
    }
}
