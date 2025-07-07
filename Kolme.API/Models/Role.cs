namespace Kolme.API.Models;

public class Role
{
    public int RoleId { get; set; }
    public string Name { get; set; } = string.Empty;

    public ICollection<EmployeeRoleAssignment> EmployeeRoles { get; set; } = new List<EmployeeRoleAssignment>();
    public ICollection<RoleModule> RoleModules { get; set; } = new List<RoleModule>();
}
