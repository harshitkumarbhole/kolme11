namespace Kolme.API.Models;

public class Document
{
    public int DocumentId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Path { get; set; } = string.Empty;

    public ICollection<ModuleDocument> ModuleDocuments { get; set; } = new List<ModuleDocument>();
}
