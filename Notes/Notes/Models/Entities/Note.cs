namespace Notes.Models.Entities
{
    public class Note
    {
        public Guid id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public bool IsVisible { get; set; }
    }
}
