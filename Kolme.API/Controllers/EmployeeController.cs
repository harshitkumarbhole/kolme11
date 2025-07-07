using Kolme.API.Helpers;

namespace Kolme.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EmployeeController : ControllerBase
{
    private readonly KolmeDbContext _context;
    private readonly ILogger<EmployeeController> _logger;

    public EmployeeController(KolmeDbContext context, ILogger<EmployeeController> logger)
    {
        _context = context;
        _logger = logger;
    }


    [HttpGet("search")]
    public ActionResult<IEnumerable<EmployeeListDTO>> Search(string? term)
    {
        try
        {
            var query = _context.Employees
                .Include(e => e.Department)
                .Include(e => e.JobTitle)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(term))
            {
                var lower = term.ToLower();
                query = query.Where(e =>
                    (e.FirstName + " " + e.LastName).ToLower().Contains(lower) ||
                    e.Department.Name.ToLower().Contains(lower) ||
                    e.JobTitle.Title.ToLower().Contains(lower));
            }

            var employees = query.Select(e => new EmployeeListDTO
            {
                EmployeeId = e.EmployeeId,
                EmployeeCode = e.EmployeeCode,
                FirstName = e.FirstName,
                MiddleName = e.MiddleName,
                LastName = e.LastName,
                PreferredName = e.PreferredName,
                PreviousSurname = e.PreviousSurname,
                Gender = e.Gender,
                StartDate = e.StartDate,
                BloodGroup = e.BloodGroup,
                Address = e.Address,
                MotherName = e.MotherName,
                FatherOrHusbandName = e.FatherOrHusbandName,
                Relationship = e.Relationship,
                StateOrRegion = e.StateOrRegion,
                Country = e.Country,
                PostalCode = e.PostalCode,
                Telephone = e.Telephone,
                Mobile = e.Mobile,
                Department = e.Department.Name,
                JobTitle = e.JobTitle.Title
            }).ToList();


            return Ok(employees);
        }
        catch (Exception ex)
        {
            _logger.LogException(ex);
            return StatusCode(500, "Internal server error");
        }
    }


    [HttpPost("add")]
    public ActionResult<EmployeeListDTO> Add(CreateEmployeeDTO dto)

    {
        try
        {
            var employee = new Employee
            {

                EmployeeCode = dto.EmployeeCode,
                FirstName = dto.FirstName,
                MiddleName = dto.MiddleName,
                LastName = dto.LastName,
                PreferredName = dto.PreferredName,
                PreviousSurname = dto.PreviousSurname,
                Gender = dto.Gender,
                StartDate = dto.StartDate,
                BloodGroup = dto.BloodGroup,
                Address = dto.Address,
                MotherName = dto.MotherName,
                FatherOrHusbandName = dto.FatherOrHusbandName,
                Relationship = dto.Relationship,
                StateOrRegion = dto.StateOrRegion,
                Country = dto.Country,
                PostalCode = dto.PostalCode,
                Telephone = dto.Telephone,
                Mobile = dto.Mobile,

                DepartmentId = dto.DepartmentId,
                JobTitleId = dto.JobTitleId,
                LocationId = dto.LocationId,
                DivisionId = dto.DivisionId,
                ReportingManagerId = dto.ReportingManagerId
            };
            _context.Employees.Add(employee);
            _context.SaveChanges();


            foreach (var roleId in dto.AssignedRoles)
            {
                if (_context.Roles.Any(r => r.RoleId == roleId))
                {
                    _context.EmployeeRoleAssignments.Add(new EmployeeRoleAssignment
                    {
                        EmployeeId = employee.EmployeeId,
                        RoleId = roleId
                    });
                }
            }

            foreach (var moduleId in dto.AssignedModules)
            {
                if (_context.Modules.Any(m => m.ModuleId == moduleId))
                {
                    _context.EmployeeModuleAssignments.Add(new EmployeeModuleAssignment
                    {
                        EmployeeId = employee.EmployeeId,
                        ModuleId = moduleId
                    });
                }
            }

            foreach (var locationId in dto.AssignedLocations)
            {
                if (_context.Locations.Any(l => l.LocationId == locationId))
                {
                    _context.EmployeeLocationAssignments.Add(new EmployeeLocationAssignment
                    {
                        EmployeeId = employee.EmployeeId,
                        LocationId = locationId
                    });
                }
            }

            _context.SaveChanges();

            var result = new EmployeeListDTO
            {
                EmployeeId = employee.EmployeeId,
                EmployeeCode = employee.EmployeeCode,
                FirstName = employee.FirstName,
                MiddleName = employee.MiddleName,
                LastName = employee.LastName,
                PreferredName = employee.PreferredName,
                PreviousSurname = employee.PreviousSurname,
                Gender = employee.Gender,
                StartDate = employee.StartDate,
                BloodGroup = employee.BloodGroup,
                Address = employee.Address,
                MotherName = employee.MotherName,
                FatherOrHusbandName = employee.FatherOrHusbandName,
                Relationship = employee.Relationship,
                StateOrRegion = employee.StateOrRegion,
                Country = employee.Country,
                PostalCode = employee.PostalCode,
                Telephone = employee.Telephone,
                Mobile = employee.Mobile,
                Department = _context.Departments.Find(employee.DepartmentId)?.Name ?? string.Empty,
                JobTitle = _context.JobTitles.Find(employee.JobTitleId)?.Title ?? string.Empty
            };

            return Created($"api/employees/{employee.EmployeeId}", result);
        }
        catch (Exception ex)
        {
            _logger.LogException(ex);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost("{id}/roles/{roleId}")]
    public ActionResult AssignRole(int id, int roleId)
    {
        try
        {
            if (!_context.Roles.Any(r => r.RoleId == roleId)) return NotFound();
            if (!_context.Employees.Any(e => e.EmployeeId == id)) return NotFound();

            var exists = _context.EmployeeRoleAssignments
                .Any(er => er.EmployeeId == id && er.RoleId == roleId);
            if (!exists)
            {
                _context.EmployeeRoleAssignments.Add(new EmployeeRoleAssignment
                {
                    EmployeeId = id,
                    RoleId = roleId
                });
                _context.SaveChanges();
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogException(ex);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost("{id}/modules/{moduleId}")]
    public ActionResult AssignModule(int id, int moduleId)
    {
        try
        {
            if (!_context.Modules.Any(m => m.ModuleId == moduleId)) return NotFound();
            if (!_context.Employees.Any(e => e.EmployeeId == id)) return NotFound();

            var exists = _context.EmployeeModuleAssignments
                .Any(em => em.EmployeeId == id && em.ModuleId == moduleId);
            if (!exists)
            {
                _context.EmployeeModuleAssignments.Add(new EmployeeModuleAssignment
                {
                    EmployeeId = id,
                    ModuleId = moduleId
                });
                _context.SaveChanges();
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogException(ex);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost("{id}/locations/{locationId}")]
    public ActionResult AssignLocation(int id, int locationId)
    {
        try
        {
            if (!_context.Locations.Any(l => l.LocationId == locationId)) return NotFound();
            if (!_context.Employees.Any(e => e.EmployeeId == id)) return NotFound();

            var exists = _context.EmployeeLocationAssignments
                .Any(el => el.EmployeeId == id && el.LocationId == locationId);
            if (!exists)
            {
                _context.EmployeeLocationAssignments.Add(new EmployeeLocationAssignment
                {
                    EmployeeId = id,
                    LocationId = locationId
                });
                _context.SaveChanges();
            }
            return NoContent();

        }
        catch (Exception ex)
        {
            _logger.LogException(ex);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPut("{id}")]
    public ActionResult Put(int id, CreateEmployeeDTO dto)
    {
        try
        {
            var employee = _context.Employees.Find(id);
            if (employee == null) return NotFound();


            employee.EmployeeCode = dto.EmployeeCode;
            employee.FirstName = dto.FirstName;
            employee.MiddleName = dto.MiddleName;
            employee.LastName = dto.LastName;
            employee.PreferredName = dto.PreferredName;
            employee.PreviousSurname = dto.PreviousSurname;
            employee.Gender = dto.Gender;
            employee.StartDate = dto.StartDate;
            employee.BloodGroup = dto.BloodGroup;
            employee.Address = dto.Address;
            employee.MotherName = dto.MotherName;
            employee.FatherOrHusbandName = dto.FatherOrHusbandName;
            employee.Relationship = dto.Relationship;
            employee.StateOrRegion = dto.StateOrRegion;
            employee.Country = dto.Country;
            employee.PostalCode = dto.PostalCode;
            employee.Telephone = dto.Telephone;
            employee.Mobile = dto.Mobile;

            employee.DepartmentId = dto.DepartmentId;
            employee.JobTitleId = dto.JobTitleId;
            employee.LocationId = dto.LocationId;
            employee.DivisionId = dto.DivisionId;
            employee.ReportingManagerId = dto.ReportingManagerId;

            _context.SaveChanges();
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogException(ex);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
        try
        {
            var employee = _context.Employees.Find(id);
            if (employee == null) return NotFound();

            _context.Employees.Remove(employee);
            _context.SaveChanges();
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogException(ex);
            return StatusCode(500, "Internal server error");
        }
    }
}
