# fa22-cs411-Q-team087-404
Team 404 repository

# Procedure with 2 advanced queries: 

delimiter //
Create Procedure CourseProcedure(IN cid VARCHAR(20))
BEGIN
declare varCourseId varchar(20);
declare varNumber int;
declare varTitle varchar(50);
declare varDeptId varchar(10);
declare varEid varchar(20);
declare varName varchar(70);
declare avggpa real;
declare feeling varchar(10);
declare level varchar(30);
declare varA1 int;
declare varA2 int;
declare varA3 int;
declare varB1 int;
declare varB2 int;
declare varB3 int;
declare varC1 int;
declare varC2 int;
declare varC3 int;
declare varD1 int;
declare varD2 int;
declare varD3 int;
declare varF int;
declare varW int;
declare percent REAL DEFAULT 0;
declare exit_loop BOOLEAN default FALSE;
declare cusCur cursor for (
select c.CourseId, c.Number, c.Title, c.DeptId, i.Eid, i.Name, num_each_grade.A1, num_each_grade.A2, num_each_grade.A3, num_each_grade.B1, num_each_grade.B2, num_each_grade.B3, num_each_grade.C1, num_each_grade.C2, num_each_grade.C3, num_each_grade.D1, num_each_grade.D2, num_each_grade.D3, num_each_grade.F, num_each_grade.W from Courses as c natural join Course_Offerings as co natural join Instructors as i natural join (select co.CourseId, i.Eid, sum(co.A1) as A1, sum(co.A2) as A2, sum(co.A3) as A3, sum(co.B1) as B1, sum(co.B2) as B2, sum(co.B3) as B3, sum(co.C1) as C1, sum(co.C2) as C2, sum(co.C3) as C3, sum(co.D1) as D1, sum(co.D2) as D2, sum(co.D3) as D3, sum(co.F) as F, sum(co.W) as W from Course_Offerings as co natural join Instructors as i group by co.CourseId, i.Eid) as num_each_grade where c.CourseId=cid);
declare continue handler for not found set exit_loop=TRUE;
drop table if exists NewTable;
create table NewTable(
    CourseId varchar(20),
    Number int,
    Title varchar(50),
    DeptId varchar(10),
    Eid varchar(20),
    Name varchar(70),
    gpa real,
    feel varchar(10),
diff varchar(30)
);
OPEN cusCur;
cloop: LOOP
    FETCH cusCur INTO varCourseId, varNumber, varTitle, varDeptId, varEid, varName, varA1, varA2, varA3, varB1, varB2, varB3, varC1, varC2, varC3, varD1, varD2, varD3, varF, varW;
    if (exit_loop) then
        LEAVE cloop;
    end if;
set avggpa=((4*varA1)+(3.66*varA2)+(3.33*varA3)+(3*varB1)+(2.66*varB2)+(2.33*varB3)+(2*varC1)+(1.66*varC2)+(1.33*varC3)+(1*varD1)+(0.66*varD2)+(0.33*varD3)+(0*varF))/(varA1+varA2+varA3+varB1+varB2+varB3+varC1+varC2+varC3+varD1+varD2+varD3+varF);

    if (avggpa>3.5) then
        set feeling=":D";
    elseif(avggpa>3) then
        set feeling=":)";
    elseif(avggpa>2.5) then
        set feeling=":/";
    elseif(avggpa>2) then
        set feeling=":(";
    else
        set feeling="D:";
    end if;

select output.percentage*100 as percentage into percent from (select CourseId, sum(A1+A2+A3) as A ,sum(A1+A2+A3+B1+B2+B3+C1+C2+C3+D1+D2+D3+F) as total, sum(A1+A2+A3)/sum(A1+A2+A3+B1+B2+B3+C1+C2+C3+D1+D2+D3+F) as percentage from Course_Offerings group by CourseId) as output  join Courses ON output.CourseId=Courses.CourseId where output.CourseId = cid;

    if (percent>80) then
        set level="Easy";
    elseif(percent>50) then
        set level="Moderate";
    else
        set level="Hard";
    end if;
    insert into NewTable VALUES (varCourseId, varNumber, varTitle, varDeptId, varEid, varName, avggpa, feeling, level);
END LOOP cloop;
CLOSE cusCur;
select DeptId, Number, CourseId, Title, Name, gpa, feel from NewTable where CourseId=cid order by DeptId, Number, CourseId, Title, Name;
end;

# Trigger:

BEGIN
SET @dif_rating=(SELECT AVG(Difficulty_rating) FROM Reviews WHERE CourseId=new.CourseId);
SET @pra_rating=(SELECT AVG(Practical_rating) FROM Reviews WHERE CourseId=new.CourseId);
SET @workload=(SELECT AVG(Workload_hours) FROM Reviews WHERE CourseId=new.CourseId);
SET @crs_rating=(SELECT AVG(Course_rating) FROM Reviews WHERE CourseId=new.CourseId);
IF new.Difficulty_rating>0 THEN
UPDATE Courses SET Difficulty_rating = @dif_rating WHERE CourseId=new.CourseId;
END IF;
IF new.Practical_rating>0 THEN
UPDATE Courses SET Practical_rating = @pra_rating WHERE CourseId=new.CourseId;
END IF;
IF new.Workload_hours>0 THEN
UPDATE Courses SET Workload_hours = @workload WHERE CourseId=new.CourseId;
END IF;
IF new.Course_rating>0 THEN
UPDATE Courses SET Course_rating = @crs_rating WHERE CourseId=new.CourseId;
END IF;
END
