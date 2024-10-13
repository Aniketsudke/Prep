


export interface Userprops {
    id: string;
    username: string;
    email: string;
    password?: string;
    avatarUrl?: string;
    provider: string;
    createdAt: Date;
    updatedAt?: Date;
  }

  export interface QuestionProps {
    id: string;
    slug: string;
    type: "MCQ" | "NUM" | "TF"; // Use your QuestionType enum values
    content: string; // Content of the question (e.g., Markdown or text)
    difficulty: string; // Difficulty level (e.g., 'easy', 'medium', 'hard')
    subject: string; // Subject of the question
    class: string; // Class level (e.g., '11th', '12th', 'Foundation')
    options: Option[]; // Options related to this question
    correctOptions: Option[]; // Correct options for this question
    numericalAnswer?: number; // Numerical answer if applicable
    isTrueFalse?: boolean; // True/False answer if applicable
    attempts: Attempt[]; // List of attempts related to this question
    accuracy?: number; // Accuracy of the question
    createdAt: string; // DateTime in ISO string format
  }
  export interface Option {
    id: string;
    content: string; // Content of the option (e.g., Markdown or text)
    isCorrect: boolean; // Indicates if this option is correct
  }
  
  export interface Attempt {
    id: string;
    userId: string; // ID of the user who attempted the question
    questionId: string; // ID of the question being attempted
    isCorrect: boolean; // Whether the user's attempt was correct
    attemptDate: string; // DateTime in ISO string format
    status: "SOLVED" | "UNSOLVED" | "ATTEMPTED"; // Status of the attempt
  }
  
  export interface ContributeFormProps {
    slug: string; // Unique slug for the question
    topicTitle: string; // Title or topic of the question
    questionType: "MCQ" | "NUM" | "TF"; // Type of the question
    std: string; // Class level (e.g., '11th', '12th', 'Foundation')
    difficulty: string; // Difficulty level (e.g., 'easy', 'medium', 'hard')
    subject: string; // List of subjects related to the question
    tag?: string; // List of tags related to the question
    content: string; // Content of the question
    options?: Option[]; // Options for MCQ and MultipleOptionCorrect types
    numericalAnswer?: number; // Numerical answer for Numerical type questions
    isTrueFalse?: boolean; // True/False answer for True/False type questions
  }

  export interface QuestionTableProps {
    id: string;
    slug: string;
    topic: string;
    difficulty: string;
    subject: string;
    class: string;
    accuracy: number;
    Status: string;
  }