namespace Kolme.API.DTOs;

public class EmployeeListDTO
{
    public int EmployeeId { get; set; }
    public string EmployeeCode { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string MiddleName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string PreferredName { get; set; } = string.Empty;
    public string PreviousSurname { get; set; } = string.Empty;
    public string Gender { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public string BloodGroup { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string MotherName { get; set; } = string.Empty;
    public string FatherOrHusbandName { get; set; } = string.Empty;
    public string Relationship { get; set; } = string.Empty;
    public string StateOrRegion { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string PostalCode { get; set; } = string.Empty;
    public string Telephone { get; set; } = string.Empty;
    public string Mobile { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
    public string JobTitle { get; set; } = string.Empty;
}
