
------Creating Database-------
CREATE DATABASE Employee;

USE Employee;
GO

------Creating EmployeeDetails table------
CREATE TABLE EmployeeDetails (

emp_ID INT NOT NULL primary key identity(1,1),
emp_First_Name varchar(20) NOT NULL,
emp_Middle_Name varchar(20),
emp_Last_Name varchar(20) NOT NULL,
emp_Email_Address nvarchar(50) NOT NULL unique,
emp_DateOfBirth date NOT NULL,
emp_Landline_No varchar(10),
emp_CountryCode nvarchar(10) NOT Null,
emp_Mobile_No varchar(10) NOT NULL unique,
emp_Alternate_MobileNo varchar(10),
emp_Age INT,
emp_Marital_Status varchar(10) NOT NULL,
isDeleted bit default 0,
isActive bit default 1,
Created_By varchar(20),
Created_At datetime,
Updated_By varchar(20),
Updated_At datetime


)

Select* from EmployeeDetails




---------Stored Procedure for Fetching Data from EmployeeDetails--------
 
-- =============================================  
-- Author: Arsh Bandlish 
-- Create date: 21 JUNE 2022  
-- Description: Insert Employee Details  into the table 
-- =============================================  
--Store procedure name is -> prc_getEmployeeDetails

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
@emp_Marital_Status varchar(10)

AS  
BEGIN  
    SET NOCOUNT ON;  
    INSERT INTO EmployeeDetails
	
	VALUES
	(@emp_First_Name,@emp_Middle_Name,@emp_Last_Name,@emp_Email_Address,
	@emp_DateOfBirth,@emp_Landline_No,@emp_CountryCode,@emp_Mobile_No,@emp_Alternate_MobileNo,@emp_Age,@emp_Marital_Status);

END  
GO  

EXEC prc_InsertEmployeeDetails 'Arsh','','Bandlish','arshbandlish@gmail.com','2001-04-26','','+91','7009235245','',21,'Unmarried';
EXEC prc_InsertEmployeeDetails 'Ritvik','','Sharma','ritvik2k9@gmail.com','2001-06-02','','+91','9464540027','',21,'Unmarried';


-----------Stored Procedure For Fetching details of a Single Employee----------------


-- =============================================  
-- Author: Arsh Bandlish
-- Create date: 21 JUNE 2022  
-- Description: Fetching details of a single employee from the table 
-- =============================================  
--Store procedure name is -> prc_getSingleEmployeeDetails
CREATE PROCEDURE prc_getSingleEmployeeDetails

@emp_ID int

AS  
BEGIN  
    SET NOCOUNT ON;  
    SELECT * FROM EmployeeDetails WHERE
	emp_ID = @emp_ID;

END  
GO  

EXEC prc_getSingleEmployeeDetails 1;



------------Stored Procedure for fetching details of entire EmployeeDetails Table--------
 
-- =============================================  
-- Author:     Arsh Bandlish 
-- Create date: 21 JUNE 2022  
-- Description: Get details of all employees
-- =============================================  
--Store procedure name is -> prc_getEmployeeDetails
CREATE PROCEDURE prc_getEmployeeDetails 
AS  
BEGIN  
    SET NOCOUNT ON;  
    Select * from EmployeeDetails;
END  
GO  

EXEC prc_getEmployeeDetails;


------------Stored Procedure for Updation of Details in EmployeeDetails Table--------------
 
-- =============================================  
-- Author:   Arsh Bandlish 
-- Create date: 21 JUNE 2022  
-- Description: Update Employee details in the table 
-- =============================================  
--Store procedure name is -> prc_updateEmployeeDetails
CREATE PROCEDURE prc_updateEmployeeDetails

@emp_ID int,
@emp_Email_Address varchar(50),
@emp_Landline_No varchar(10),
@emp_Country_Code varchar(10),
@emp_Mobile_No varchar(15),
@emp_Alternate_MobileNo varchar(10),
@emp_Marital_Status varchar(10)

AS  
BEGIN  
    SET NOCOUNT ON;  
   UPDATE EmployeeDetails SET emp_Email_Address = @emp_Email_Address, emp_Landline_No = @emp_Landline_No,emp_CountryCode=@emp_Country_Code, 
   emp_Mobile_No = @emp_Mobile_No,emp_Alternate_MobileNo=@emp_Alternate_MobileNo,emp_Marital_Status=@emp_Marital_Status

	WHERE @emp_ID = @emp_ID;

END  
GO  

EXEC prc_updateEmployeeDetails 1, 'arsh.bandlish@cginfinity.com','','+1','7009235245','','Unmarried';



------------Stored Procedure For deleting record from database----------------------


-- =============================================  
-- Author:  Arsh Bandlish
-- Create date: 21 JUNE 2022  
-- Description: Delete a record from EmployeeDetails Table
-- =============================================  
--Store procedure name is -> prc_deleteEmployeedetails

CREATE PROCEDURE prc_deleteEmployeedetails

@emp_ID int

AS  
BEGIN  
    SET NOCOUNT ON;  
    
	DELETE FROM EmployeeDetails  
    where emp_ID = @emp_ID 

END  
GO  

EXEC prc_deleteEmployeedetails 7;








