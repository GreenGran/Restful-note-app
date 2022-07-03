using Microsoft.EntityFrameworkCore;
using Notes.Models.Entities;

namespace Notes.Data
{
    public class NotesDbContext : DbContext
    {
        public NotesDbContext(DbContextOptions options) : base(options)
        {
        }


        public DbSet<Note> Notes { get; set; }



    }
}
