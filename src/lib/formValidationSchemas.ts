import { optional, z } from "zod";

export const subjectSchema = z.object({
	id: z.coerce.number().pipe(z.number()).optional(),
	name: z.string().min(1, { message: "Subject name is required!" }),
	teachers: z.array(z.string()), //teacher ids
});

export type SubjectSchema = z.infer<typeof subjectSchema>;

const capacityField = z.coerce
	.number()
	.min(1, { message: "Capacity name is required!" });
const gradeIdField = z.coerce
	.number()
	.min(1, { message: "Grade name is required!" });

export const classSchema = z.object({
	id: z.coerce.number().optional(),
	name: z.string().min(1, { message: "Subject name is required!" }),
	capacity: capacityField,
	gradeId: gradeIdField,
	supervisorId: z.coerce.string().optional(),
});

export type ClassSchema = z.infer<typeof classSchema>;

const teacherBirthdayField = z.coerce.date({
	message: "Birthday is required!",
});
const studentBirthdayField = z.coerce.date({
	message: "Birthday is required!",
});
const studentGradeIdField = z.coerce
	.number()
	.min(1, { message: "Grade is required!" });
const studentClassIdField = z.coerce
	.number()
	.min(1, { message: "Class is required!" });

export const teacherSchema = z.object({
	id: z.string().optional(),
	username: z
		.string()
		.min(3, { message: "Username must be at least 3 characters long!" })
		.max(20, { message: "Username must be at most 20 characters long!" }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long!" })
		.optional()
		.or(z.literal("")),
	name: z.string().min(1, { message: "First name is required!" }),
	surname: z.string().min(1, { message: "Last name is required!" }),
	email: z
		.string()
		.email({ message: "Invalid email address!" })
		.optional()
		.or(z.literal("")),
	phone: z.string().optional(),
	address: z.string(),
	img: z.string().optional(),
	position: z.string().min(1, { message: "Blood Type is required!" }),
	birthday: teacherBirthdayField,
	sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
	subjects: z.array(z.string()).optional(), // subject ids
});

export type TeacherSchema = z.infer<typeof teacherSchema>;

export const studentSchema = z.object({
	id: z.string().optional(),
	username: z
		.string()
		.min(3, { message: "Username must be at least 3 characters long!" })
		.max(20, { message: "Username must be at most 20 characters long!" }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long!" })
		.optional()
		.or(z.literal("")),
	name: z.string().min(1, { message: "First name is required!" }),
	surname: z.string().min(1, { message: "Last name is required!" }),
	email: z
		.string()
		.email({ message: "Invalid email address!" })
		.optional()
		.or(z.literal("")),
	phone: z.string().optional(),
	address: z.string(),
	img: z.string().optional(),
	position: z.string().min(1, { message: "Blood Type is required!" }),
	birthday: studentBirthdayField,
	sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
	gradeId: studentGradeIdField,
	classId: studentClassIdField,
});

export type StudentSchema = z.infer<typeof studentSchema>;

const examLessonIdField = z.coerce
	.number()
	.min(1, { message: "Lesson is required!" });

export const examSchema = z.object({
	id: z.coerce.number().optional(),
	title: z.string().min(1, { message: "Title name is required!" }),
	startTime: z.coerce.date({ message: "Start time is required!" }),
	endTime: z.coerce.date({ message: "End time is required!" }),
	lessonId: examLessonIdField,
});

export type ExamSchema = z.infer<typeof examSchema>;
