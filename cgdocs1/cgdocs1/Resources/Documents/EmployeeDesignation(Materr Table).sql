
-------------Master Table for Employee Designation----------------------
CREATE TABLE EmployeeDesignation (

empDesignation_ID INT NOT NULL primary key identity(1,1),
emp_Designation varchar(20) NOT NULL,
isDeleted bit default 0,
isActive bit default 1,
Created_By varchar(20) NOT NULL,
Created_At datetime default(GETDATE()),
Updated_By varchar(20),
Updated_At datetime 
)


Go


/* STORED PROCEDURE TO INSERT*/
CREATE PROCEDURE prc_Insert_EmployeeDesignation
    @emp_Designation varchar(20),
    @Created_By varchar(20)
	
AS
Begin
Set NOCOUNT ON;
INSERT INTO EmployeeDesignation(emp_Designation,Created_By) VALUES (@emp_Designation,@Created_By)
end
Go



EXEC prc_Insert_EmployeeDesignation @emp_Designation='Intern',@Created_By='Arsh'
EXEC prc_Insert_EmployeeDesignation @emp_Designation='Intern',@Created_By='Somnath'
EXEC prc_Insert_EmployeeDesignation @emp_Designation='Intern',@Created_By='Rishit'
GO

SELECT * from EmployeeDesignation


/* STORED PROCEDURE TO GET*/
create procedure prc_GetEmployeeDesignation
@empDesignation_ID int
as
begin
declare @del int
select @del=isDeleted from EmployeeDesignation where empDesignation_ID=@empDesignation_ID
end
if @del=0
begin
begin
Set NOCOUNT ON;
select empDesignation_ID,emp_Designation
 from EmployeeDesignation where empDesignation_ID=@empDesignation_ID
end
begin
declare @query int
select @query=isActive from EmployeeDesignation where empDesignation_ID=@empDesignation_ID
Select case when @query=0 then 'User is InActive'
when @query=1 then 'User is Active'
end
end
end
Go
EXEC prc_GetEmployeeDesignation @empDesignation_ID=3
Go

/* STORED PROCEDURE TO UPDATE*/
CREATE PROCEDURE procedure_UpdateEmployeeDesignation
@empDesignation_ID int,
@emp_Designation varchar(20),
@Updated_By varchar(30),
@Updated_At datetime,
@IsActive bit

as
begin
set nocount on;
Update EmployeeDesignation set emp_Designation=@emp_Designation ,Updated_By=@Updated_By,Updated_At=GETDATE(),IsActive=@IsActive where empDesignation_ID=@empDesignation_ID
end

GO
declare @Updated_At as datetime=getdate()
Exec procedure_UpdateEmployeeDesignation @emp_Designation='President', @Updated_By='Arsh',@Updated_At=@Updated_At,@IsActive=1,@empDesignation_ID=1
Go

/* STORED PROCEDURE TO DELETE*/
CREATE PROCEDURE proc_DeleteEmployeeDesignation
@empDesignation_ID int,
@Updated_By varchar(30),
@Updated_At datetime,
@IsDeleted bit
as
begin
set NOCOUNT on;
Update EmployeeDesignation set Updated_By=@Updated_By,Updated_At=GETDATE(),IsDeleted=@IsDeleted where empDesignation_ID=@empDesignation_ID
end
go
declare @Updated_At as datetime=getdate()
exec proc_DeleteEmployeeDesignation @empDesignation_ID=1, @Updated_By='Arsh', @Updated_At=@Updated_At,@isDeleted=1
Go
