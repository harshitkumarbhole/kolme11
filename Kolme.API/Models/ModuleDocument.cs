namespace Kolme.API.Models;

public class ModuleDocument
{
    public int ModuleId { get; set; }
    public Module Module { get; set; } = null!;

    public int DocumentId { get; set; }
    public Document Document { get; set; } = null!;
}
