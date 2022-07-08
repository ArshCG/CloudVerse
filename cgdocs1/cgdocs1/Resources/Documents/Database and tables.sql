/*Creating Database*/
CREATE DATABASE Employee;
USE Employee;
GO

/*Master Table for Employee Designation*/
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

/*Creating EmployeeDetails Transaction table*/
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
emp_Designation_id int NOT NULL,
  FOREIGN KEY(emp_Designation_id) REFERENCES EmployeeDesignation(empDesignation_ID),
isDeleted bit default 0,
isActive bit default 1,
Created_By varchar(20) NOT NULL,
Created_At datetime default(GETDATE()),
Updated_By varchar(20),
Updated_At datetime
)
