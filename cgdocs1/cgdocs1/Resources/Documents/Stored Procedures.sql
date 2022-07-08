-------------Stored Procedures for Master Table Employee Designation---------------


/* STORED PROCEDURE TO INSERT IN MASTER TABLE(EMPLOYEE DESIGNATION TABLE)*/
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


/* STORED PROCEDURE TO GET IN MASTER TABLE(EMPLOYEE DESIGNATION TABLE)*/
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
		select 
		empDesignation_ID,emp_Designation
		from EmployeeDesignation 
		where empDesignation_ID=@empDesignation_ID
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


/* STORED PROCEDURE TO UPDATE IN MASTER TABLE(EMPLOYEE DESIGNATION TABLE)*/
CREATE PROCEDURE procedure_UpdateeEmployeeDesignation
@empDesignation_ID int,
@emp_Designation varchar(20),
@Updated_By varchar(30),
@IsActive bit
as
begin
	set nocount on;
	Update EmployeeDesignation 
	set emp_Designation=@emp_Designation ,Updated_By=@Updated_By,Updated_At=GETDATE(),IsActive=@IsActive where empDesignation_ID=@empDesignation_ID
end
GO
Exec procedure_UpdateeEmployeeDesignation @emp_Designation='Consultant1', @Updated_By='Arsh',@IsActive=1,@empDesignation_ID=3
Go


/* STORED PROCEDURE TO DELETE IN MASTER TABLE(EMPLOYEE DESIGNATION TABLE)*/
CREATE PROCEDURE prc_DeleteEmployeeDesignation
@empDesignation_ID int,
@Updated_By varchar(30),
@IsDeleted bit
as
begin
	set NOCOUNT on;
	Update EmployeeDesignation 
	set Updated_By=@Updated_By,Updated_At=GETDATE(),IsDeleted=@IsDeleted where empDesignation_ID=@empDesignation_ID
end
go
exec prc_DeleteEmployeeDesignation @empDesignation_ID=1, @Updated_By='Arsh',@isDeleted=1
Go



--------------Stored Procedures for Transaction Table (Employee Details)------------


/*Stored Procedure for Inserting Data in EmployeeDetails Table*/
GO
CREATE PROCEDURE prc_InsertEmployeeDetails
@emp_First_Name varchar(20),
@emp_Middle_Name varchar(20),
@emp_Last_Name varchar(20),
@emp_Email_Address varchar(50),
@emp_DateOfBirth date,
@emp_Landline_No varchar(10),
@emp_CountryCode nvarchar(10),
@emp_Mobile_No varchar(10),
@emp_Alternate_MobileNo varchar(10),
@emp_Age int,
@emp_Marital_Status varchar(10),
@emp_Designation_id int,
@Created_By varchar(30)
AS  
BEGIN  
    SET NOCOUNT ON;  
    INSERT INTO EmployeeDetails(emp_First_Name ,emp_Middle_Name,emp_Last_Name,emp_Email_Address,emp_DateOfBirth,emp_Landline_No,emp_CountryCode,emp_Mobile_No,emp_Alternate_MobileNo,emp_Age,emp_Marital_Status,emp_Designation_id,Created_By)
	VALUES
	(@emp_First_Name,@emp_Middle_Name,@emp_Last_Name,@emp_Email_Address,@emp_DateOfBirth,@emp_Landline_No,@emp_CountryCode,@emp_Mobile_No,@emp_Alternate_MobileNo,@emp_Age,@emp_Marital_Status,@emp_Designation_id,@Created_By);
END  
GO  
EXEC prc_InsertEmployeeDetails @emp_First_Name='Arsh',@emp_Middle_Name='',@emp_Last_Name='Bandlish',@emp_Email_Address='arshbandlish@gmail.com',@emp_DateOfBirth='2001-04-26',@emp_Landline_No='',@emp_CountryCode='+91',@emp_Mobile_No='7009235245',@emp_Alternate_MobileNo='',@emp_Age=21,@emp_Marital_Status='Unmarried',@emp_Designation_id=1,@Created_By='Arsh'
EXEC prc_InsertEmployeeDetails @emp_First_Name='Mohit',@emp_Middle_Name='',@emp_Last_Name='Garg',@emp_Email_Address='mohitgarg@gmail.com',@emp_DateOfBirth='2001-05-02',@emp_Landline_No='',@emp_CountryCode='+91',@emp_Mobile_No='8427472900',@emp_Alternate_MobileNo='',@emp_Age=21,@emp_Marital_Status='Unmarried',@emp_Designation_id=1,@Created_By='Arsh'


/*Stored Procedure For Fetching details of a Single Employee in Employee Details Table*/
GO
create procedure prc_getSingleEmployeeDetails
@emp_ID int
as
begin
	declare @del int
	select @del=IsDeleted from EmployeeDetails where emp_ID=@emp_ID
end
if @del=0
begin
	begin
		Set NOCOUNT ON;
		select 
		emp_ID,emp_First_Name,emp_Middle_Name,emp_Last_Name,emp_Age,emp_DateOfBirth,emp_Landline_No,
		emp_Mobile_No,emp_Email_Address,emp_Alternate_MobileNo,emp_Marital_Status,emp_Designation_id 
		from EmployeeDetails 
		where emp_ID=@emp_ID
	end
	begin
		declare @query int
		select @query=isActive from EmployeeDetails where emp_ID=@emp_ID
		Select case when @query=0 then 'User is Inactive'
		when @query=1 then 'User is Active'
	end
end
end
Go
EXEC prc_getSingleEmployeeDetails @emp_ID=2



/*Stored Procedure for Updation of Details in EmployeeDetails Table*/
GO
CREATE PROCEDURE procedure_updateEmployeeDetails
@emp_ID int,
@emp_Email_Address varchar(50),
@emp_Landline_No varchar(10),
@emp_Country_Code varchar(10),
@emp_Mobile_No varchar(15),
@emp_Alternate_MobileNo varchar(10),
@emp_Marital_Status varchar(10),
@emp_Designation_id int,
@isActive bit=1,
@Updated_By varchar
AS  
BEGIN  
    SET NOCOUNT ON;  
    UPDATE EmployeeDetails 
	SET emp_Email_Address = @emp_Email_Address, emp_Landline_No = @emp_Landline_No,emp_CountryCode=@emp_Country_Code, 
    emp_Mobile_No = @emp_Mobile_No,emp_Alternate_MobileNo=@emp_Alternate_MobileNo,emp_Marital_Status=@emp_Marital_Status,emp_Designation_id=@emp_Designation_id,isActive=@isActive,Updated_By=@Updated_By,Updated_At=GETDATE()
	WHERE @emp_ID = @emp_ID;
END  
GO  
EXEC procedure_updateEmployeeDetails @emp_ID=1,@emp_Email_Address='arsh.bandlish@cginfinity.com',@emp_Landline_No='',@emp_Country_Code='+91',@emp_Mobile_No='7009235245',@emp_Alternate_MobileNo='9463797747',@emp_Marital_Status='Unmarried',@emp_Designation_id= 1,@isActive=1,@Updated_By='Arsh';



/*Stored Procedure For deleting record from database*/
GO
CREATE PROCEDURE proc_deleteEmployeedetails
@emp_ID int,
@isDeleted bit=0,
@Updated_By varchar
AS  
BEGIN  
    SET NOCOUNT ON;  
	UPDATE EmployeeDetails SET isDeleted=@isDeleted,Updated_By=@Updated_By,Updated_At=GETDATE()
	WHERE emp_ID = @emp_ID;
END  
GO  
EXEC proc_deleteEmployeedetails @emp_ID=1,@isDeleted=1,@Updated_By='Arsh';
