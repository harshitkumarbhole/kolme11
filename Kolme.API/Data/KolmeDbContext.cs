namespace Kolme.API.Data;

public class KolmeDbContext : DbContext
{
    public KolmeDbContext(DbContextOptions<KolmeDbContext> options) : base(options) { }

    public DbSet<Employee> Employees { get; set; } = null!;
    public DbSet<Department> Departments { get; set; } = null!;
    public DbSet<JobTitle> JobTitles { get; set; } = null!;
    public DbSet<Location> Locations { get; set; } = null!;
    public DbSet<Division> Divisions { get; set; } = null!;
    public DbSet<Role> Roles { get; set; } = null!;
    public DbSet<Module> Modules { get; set; } = null!;
    public DbSet<Document> Documents { get; set; } = null!;
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<EmployeeRoleAssignment> EmployeeRoleAssignments { get; set; } = null!;
    public DbSet<EmployeeModuleAssignment> EmployeeModuleAssignments { get; set; } = null!;
    public DbSet<EmployeeLocationAssignment> EmployeeLocationAssignments { get; set; } = null!;
    public DbSet<RoleModule> RoleModules { get; set; } = null!;
    public DbSet<ModuleDocument> ModuleDocuments { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Employee>()
            .HasOne(e => e.Department)
            .WithMany(d => d.Employees)
            .HasForeignKey(e => e.DepartmentId);

        modelBuilder.Entity<Employee>()
            .HasOne(e => e.JobTitle)
            .WithMany(j => j.Employees)
            .HasForeignKey(e => e.JobTitleId);

        modelBuilder.Entity<Employee>()
            .HasOne(e => e.Location)
            .WithMany(l => l.Employees)
            .HasForeignKey(e => e.LocationId);

        modelBuilder.Entity<Employee>()
            .HasOne(e => e.Division)
            .WithMany(dv => dv.Employees)
            .HasForeignKey(e => e.DivisionId);

        modelBuilder.Entity<Employee>()
            .HasOne(e => e.ReportingManager)
            .WithMany()
            .HasForeignKey(e => e.ReportingManagerId);

        modelBuilder.Entity<EmployeeRoleAssignment>()
            .HasKey(er => new { er.EmployeeId, er.RoleId });
        modelBuilder.Entity<EmployeeRoleAssignment>()
            .HasOne(er => er.Employee)
            .WithMany(e => e.EmployeeRoles)
            .HasForeignKey(er => er.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);
        modelBuilder.Entity<EmployeeRoleAssignment>()
            .HasOne(er => er.Role)
            .WithMany(r => r.EmployeeRoles)
            .HasForeignKey(er => er.RoleId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<EmployeeModuleAssignment>()
            .HasKey(em => new { em.EmployeeId, em.ModuleId });
        modelBuilder.Entity<EmployeeModuleAssignment>()
            .HasOne(em => em.Employee)
            .WithMany(e => e.EmployeeModules)
            .HasForeignKey(em => em.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);
        modelBuilder.Entity<EmployeeModuleAssignment>()
            .HasOne(em => em.Module)
            .WithMany(m => m.EmployeeModules)
            .HasForeignKey(em => em.ModuleId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<EmployeeLocationAssignment>()
            .HasKey(el => new { el.EmployeeId, el.LocationId });
        modelBuilder.Entity<EmployeeLocationAssignment>()
            .HasOne(el => el.Employee)
            .WithMany(e => e.EmployeeLocations)
            .HasForeignKey(el => el.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);
        modelBuilder.Entity<EmployeeLocationAssignment>()
            .HasOne(el => el.Location)
            .WithMany(l => l.EmployeeLocations)
            .HasForeignKey(el => el.LocationId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<RoleModule>()
            .HasKey(rm => new { rm.RoleId, rm.ModuleId });
        modelBuilder.Entity<RoleModule>()
            .HasOne(rm => rm.Role)
            .WithMany(r => r.RoleModules)
            .HasForeignKey(rm => rm.RoleId)
            .OnDelete(DeleteBehavior.Restrict);
        modelBuilder.Entity<RoleModule>()
            .HasOne(rm => rm.Module)
            .WithMany(m => m.RoleModules)
            .HasForeignKey(rm => rm.ModuleId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<ModuleDocument>()
            .HasKey(md => new { md.ModuleId, md.DocumentId });
        modelBuilder.Entity<ModuleDocument>()
            .HasOne(md => md.Module)
            .WithMany(m => m.ModuleDocuments)
            .HasForeignKey(md => md.ModuleId)
            .OnDelete(DeleteBehavior.Restrict);
        modelBuilder.Entity<ModuleDocument>()
            .HasOne(md => md.Document)
            .WithMany(d => d.ModuleDocuments)
            .HasForeignKey(md => md.DocumentId)
            .OnDelete(DeleteBehavior.Restrict);

        SeedData(modelBuilder);
    }

    private static void SeedData(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Department>().HasData(
            new Department { DepartmentId = 1, Name = "HR" },
            new Department { DepartmentId = 2, Name = "IT" }
        );

        modelBuilder.Entity<JobTitle>().HasData(
            new JobTitle { JobTitleId = 1, Title = "Manager" },
            new JobTitle { JobTitleId = 2, Title = "Developer" }
        );

        modelBuilder.Entity<Location>().HasData(
            new Location { LocationId = 1, Name = "New York" },
            new Location { LocationId = 2, Name = "London" }
        );

        modelBuilder.Entity<Division>().HasData(
            new Division { DivisionId = 1, Name = "Corporate" },
            new Division { DivisionId = 2, Name = "Operations" }
        );

        modelBuilder.Entity<Role>().HasData(
            new Role { RoleId = 1, Name = "Admin" },
            new Role { RoleId = 2, Name = "User" }
        );

        modelBuilder.Entity<Module>().HasData(
            new Module { ModuleId = 1, Name = "Core" },
            new Module { ModuleId = 2, Name = "Reports" }
        );

        modelBuilder.Entity<Document>().HasData(
            new Document { DocumentId = 1, Name = "Doc1", Path = "/docs/doc1.pdf" },
            new Document { DocumentId = 2, Name = "Doc2", Path = "/docs/doc2.pdf" }
        );

        modelBuilder.Entity<User>().HasData(
            new User { UserId = 1, Username = "admin", PasswordHash = "admin" },
            new User { UserId = 2, Username = "jsmith", PasswordHash = "password" }
        );

        modelBuilder.Entity<Employee>().HasData(
            new Employee
            {
                EmployeeId = 1,
                EmployeeCode = "EMP001",
                FirstName = "John",
                MiddleName = "A",
                LastName = "Doe",
                PreferredName = "Johnny",
                PreviousSurname = string.Empty,
                Gender = "M",
                StartDate = new DateTime(2024, 1, 15),
                BloodGroup = "O+",
                Address = "123 Main St",
                MotherName = "Anna Doe",
                FatherOrHusbandName = "Robert Doe",
                Relationship = "Single",
                StateOrRegion = "NY",
                Country = "USA",
                PostalCode = "10001",
                Telephone = "555-1000",
                Mobile = "555-2000",
                DepartmentId = 1,
                JobTitleId = 1,
                LocationId = 1,
                DivisionId = 1
            },
            new Employee
            {
                EmployeeId = 2,
                EmployeeCode = "EMP002",
                FirstName = "Jane",
                MiddleName = "B",
                LastName = "Smith",
                PreferredName = "Janey",
                PreviousSurname = string.Empty,
                Gender = "F",
                StartDate = new DateTime(2024, 2, 10),
                BloodGroup = "A+",
                Address = "456 Market St",
                MotherName = "Betty Smith",
                FatherOrHusbandName = "Michael Smith",
                Relationship = "Married",
                StateOrRegion = "London",
                Country = "UK",
                PostalCode = "SW1A1AA",
                Telephone = "020-7000",
                Mobile = "07000-2000",
                DepartmentId = 2,
                JobTitleId = 2,
                LocationId = 2,
                DivisionId = 2,
                ReportingManagerId = 1
            }
        );

        modelBuilder.Entity<EmployeeRoleAssignment>().HasData(
            new EmployeeRoleAssignment { EmployeeId = 1, RoleId = 1 },
            new EmployeeRoleAssignment { EmployeeId = 2, RoleId = 2 }
        );
        modelBuilder.Entity<EmployeeModuleAssignment>().HasData(
            new EmployeeModuleAssignment { EmployeeId = 1, ModuleId = 1 },
            new EmployeeModuleAssignment { EmployeeId = 2, ModuleId = 2 }
        );
        modelBuilder.Entity<EmployeeLocationAssignment>().HasData(
            new EmployeeLocationAssignment { EmployeeId = 1, LocationId = 1 },
            new EmployeeLocationAssignment { EmployeeId = 2, LocationId = 2 }
        );
        modelBuilder.Entity<RoleModule>().HasData(
            new RoleModule { RoleId = 1, ModuleId = 1 },
            new RoleModule { RoleId = 2, ModuleId = 2 }
        );
        modelBuilder.Entity<ModuleDocument>().HasData(
            new ModuleDocument { ModuleId = 1, DocumentId = 1 },
            new ModuleDocument { ModuleId = 2, DocumentId = 2 }
        );
    }
}
