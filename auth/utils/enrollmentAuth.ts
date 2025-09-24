// auth/utils/enrollmentAuth.ts
import { sendSignInLinkToEmail, ActionCodeSettings } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

export interface EnrollmentData {
  fullName: string;
  email: string;
  phone: string;
  regNum: string;
  bloodStatus: string;
}

export class EnrollmentAuthService {
  // Validate email format and registration number match
  static validateEnrollment(data: EnrollmentData): { isValid: boolean; error?: string } {
    const { email, regNum } = data;
    
    // Check email format: <name>.<reg_number>@vitapstudent.ac.in
    const emailRegex = /^([a-zA-Z]+)\.([a-zA-Z0-9]+)@vitapstudent\.ac\.in$/;
    const match = email.match(emailRegex);
    
    if (!match) {
      return { 
        isValid: false, 
        error: "Email must be in format: <name>.<reg_number>@vitapstudent.ac.in" 
      };
    }
    
    const [, emailName, emailRegNum] = match;
    
    // Only validate that registration number matches (name can be anything)
    // Case-insensitive comparison for registration numbers
    if (emailRegNum.toLowerCase() !== regNum.toLowerCase()) {
      return { 
        isValid: false, 
        error: `Email registration number "${emailRegNum}" must match your registration number "${regNum}"` 
      };
    }
    
    return { isValid: true };
  }

  // Send sign-in link to email for passwordless authentication
  static async sendMagicalSignInLink(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const actionCodeSettings: ActionCodeSettings = {
        // URL you want to redirect back to after sign-in
        url: `${window.location.origin}/auth?mode=signin`,
        // This must be true for sign-in with email link
        handleCodeInApp: true,
      };
      
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      
      // Save the email locally so we can complete sign-in later
      window.localStorage.setItem('emailForSignIn', email);
      
      return { 
        success: true 
      };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.message || "Failed to send magical sign-in link" 
      };
    }
  }

  // Combined enrollment and auth creation
  static async processEnrollment(data: EnrollmentData): Promise<{ success: boolean; error?: string }> {
    // Validate enrollment data
    const validation = this.validateEnrollment(data);
    if (!validation.isValid) {
      return { success: false, error: validation.error };
    }

    // Send sign-in link to email
    return await this.sendMagicalSignInLink(data.email);
  }
}