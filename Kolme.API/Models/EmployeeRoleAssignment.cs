namespace Kolme.API.Models;

public class EmployeeRoleAssignment
{
    public int EmployeeId { get; set; }
    public Employee Employee { get; set; } = null!;

    public int RoleId { get; set; }
    public Role Role { get; set; } = null!;
}
