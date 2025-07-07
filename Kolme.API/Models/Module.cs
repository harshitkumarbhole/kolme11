namespace Kolme.API.Models;

public class Module
{
    public int ModuleId { get; set; }
    public string Name { get; set; } = string.Empty;

    public ICollection<EmployeeModuleAssignment> EmployeeModules { get; set; } = new List<EmployeeModuleAssignment>();
    public ICollection<RoleModule> RoleModules { get; set; } = new List<RoleModule>();
    public ICollection<ModuleDocument> ModuleDocuments { get; set; } = new List<ModuleDocument>();
}
