-- AlterTable
CREATE SEQUENCE student_rank_seq;
ALTER TABLE "Student" ALTER COLUMN "rank" SET DEFAULT nextval('student_rank_seq');
ALTER SEQUENCE student_rank_seq OWNED BY "Student"."rank";
