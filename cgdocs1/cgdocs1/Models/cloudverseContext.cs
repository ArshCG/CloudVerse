using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace cgdocs1.Models
{
    public partial class cloudverseContext : DbContext
    {
        public cloudverseContext()
        {
        }

        public cloudverseContext(DbContextOptions<cloudverseContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Documents> Documents { get; set; }
        public virtual DbSet<Folders> Folders { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        // Unable to generate entity type for table 'dbo.Table_1'. Please see the warning messages.

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS;Database=cloudverse;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Documents>(entity =>
            {
                entity.HasKey(e => e.DocId);

                entity.ToTable("documents");

                entity.Property(e => e.DocId).HasColumnName("doc_id");

                entity.Property(e => e.ContentType)
                    .HasColumnName("content_type")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedAt).HasColumnType("datetime");

                entity.Property(e => e.DName)
                    .HasColumnName("d_name")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FolderId).HasColumnName("folder_id");

                entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");

                entity.Property(e => e.Size).HasColumnName("size");

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.Documents)
                    .HasForeignKey(d => d.CreatedBy)
                    .HasConstraintName("FK__documents__Creat__6C190EBB");

                entity.HasOne(d => d.Folder)
                    .WithMany(p => p.Documents)
                    .HasForeignKey(d => d.FolderId)
                    .HasConstraintName("FK__documents__folde__6D0D32F4");
            });

            modelBuilder.Entity<Folders>(entity =>
            {
                entity.ToTable("folders");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreatedAt).HasColumnType("datetime");

                entity.Property(e => e.FName)
                    .IsRequired()
                    .HasColumnName("f_name")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.Folders)
                    .HasForeignKey(d => d.CreatedBy)
                    .HasConstraintName("FK__folders__Created__693CA210");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.ToTable("users");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreatedAt).HasColumnType("datetime");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasMaxLength(100);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasColumnName("username")
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });
        }
    }
}
