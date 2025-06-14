// Validation utility library
export interface ValidationRule<T = any> {
  test: (value: T) => boolean;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Basic validation functions
export const validators = {
  // Required field validation
  required: (message = 'This field is required'): ValidationRule<any> => ({
    test: (value) => {
      if (typeof value === 'string') return value.trim().length > 0;
      if (Array.isArray(value)) return value.length > 0;
      return value !== null && value !== undefined;
    },
    message,
  }),

  // Email validation
  email: (message = 'Please enter a valid email address'): ValidationRule<string> => ({
    test: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    },
    message,
  }),

  // Phone validation
  phone: (message = 'Please enter a valid phone number'): ValidationRule<string> => ({
    test: (value) => {
      const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
      return phoneRegex.test(value.replace(/\s/g, ''));
    },
    message,
  }),

  // URL validation
  url: (message = 'Please enter a valid URL'): ValidationRule<string> => ({
    test: (value) => {
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    message,
  }),

  // Minimum length validation
  minLength: (min: number, message?: string): ValidationRule<string> => ({
    test: (value) => value.length >= min,
    message: message || `Must be at least ${min} characters long`,
  }),

  // Maximum length validation
  maxLength: (max: number, message?: string): ValidationRule<string> => ({
    test: (value) => value.length <= max,
    message: message || `Must be no more than ${max} characters long`,
  }),

  // Password strength validation
  password: (message = 'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character'): ValidationRule<string> => ({
    test: (value) => {
      const hasMinLength = value.length >= 8;
      const hasUppercase = /[A-Z]/.test(value);
      const hasLowercase = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      
      return hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
    },
    message,
  }),

  // Numeric validation
  numeric: (message = 'Must be a valid number'): ValidationRule<string | number> => ({
    test: (value) => {
      const num = typeof value === 'string' ? parseFloat(value) : value;
      return !isNaN(num) && isFinite(num);
    },
    message,
  }),

  // Minimum value validation
  min: (minimum: number, message?: string): ValidationRule<number> => ({
    test: (value) => value >= minimum,
    message: message || `Must be at least ${minimum}`,
  }),

  // Maximum value validation
  max: (maximum: number, message?: string): ValidationRule<number> => ({
    test: (value) => value <= maximum,
    message: message || `Must be no more than ${maximum}`,
  }),

  // Credit card validation (Luhn algorithm)
  creditCard: (message = 'Please enter a valid credit card number'): ValidationRule<string> => ({
    test: (value) => {
      const cleanValue = value.replace(/\s/g, '');
      if (!/^\d+$/.test(cleanValue)) return false;
      
      let sum = 0;
      let shouldDouble = false;
      
      for (let i = cleanValue.length - 1; i >= 0; i--) {
        let digit = parseInt(cleanValue.charAt(i));
        
        if (shouldDouble) {
          digit *= 2;
          if (digit > 9) digit -= 9;
        }
        
        sum += digit;
        shouldDouble = !shouldDouble;
      }
      
      return sum % 10 === 0;
    },
    message,
  }),

  // Date validation
  date: (message = 'Please enter a valid date'): ValidationRule<string> => ({
    test: (value) => {
      const date = new Date(value);
      return !isNaN(date.getTime());
    },
    message,
  }),

  // Future date validation
  futureDate: (message = 'Date must be in the future'): ValidationRule<string> => ({
    test: (value) => {
      const date = new Date(value);
      return date > new Date();
    },
    message,
  }),

  // Past date validation
  pastDate: (message = 'Date must be in the past'): ValidationRule<string> => ({
    test: (value) => {
      const date = new Date(value);
      return date < new Date();
    },
    message,
  }),

  // Custom regex validation
  pattern: (regex: RegExp, message: string): ValidationRule<string> => ({
    test: (value) => regex.test(value),
    message,
  }),

  // Array length validation
  arrayLength: (min: number, max?: number, message?: string): ValidationRule<any[]> => ({
    test: (value) => {
      if (max !== undefined) {
        return value.length >= min && value.length <= max;
      }
      return value.length >= min;
    },
    message: message || (max !== undefined 
      ? `Must have between ${min} and ${max} items`
      : `Must have at least ${min} items`),
  }),

  // File validation
  file: (
    allowedTypes?: string[],
    maxSize?: number,
    message?: string
  ): ValidationRule<File> => ({
    test: (file) => {
      if (allowedTypes && !allowedTypes.includes(file.type)) {
        return false;
      }
      if (maxSize && file.size > maxSize) {
        return false;
      }
      return true;
    },
    message: message || 'Invalid file',
  }),
};

// Validation engine
export class Validator {
  private rules: Record<string, ValidationRule[]> = {};

  // Add validation rule for a field
  addRule(field: string, rule: ValidationRule): this {
    if (!this.rules[field]) {
      this.rules[field] = [];
    }
    this.rules[field].push(rule);
    return this;
  }

  // Add multiple rules for a field
  addRules(field: string, rules: ValidationRule[]): this {
    rules.forEach(rule => this.addRule(field, rule));
    return this;
  }

  // Validate a single field
  validateField(field: string, value: any): ValidationResult {
    const fieldRules = this.rules[field] || [];
    const errors: string[] = [];

    for (const rule of fieldRules) {
      if (!rule.test(value)) {
        errors.push(rule.message);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Validate all fields
  validateAll(data: Record<string, any>): Record<string, ValidationResult> {
    const results: Record<string, ValidationResult> = {};
    
    Object.keys(this.rules).forEach(field => {
      results[field] = this.validateField(field, data[field]);
    });

    return results;
  }

  // Check if all fields are valid
  isValid(data: Record<string, any>): boolean {
    const results = this.validateAll(data);
    return Object.values(results).every(result => result.isValid);
  }

  // Get all errors
  getErrors(data: Record<string, any>): Record<string, string[]> {
    const results = this.validateAll(data);
    const errors: Record<string, string[]> = {};
    
    Object.entries(results).forEach(([field, result]) => {
      if (!result.isValid) {
        errors[field] = result.errors;
      }
    });

    return errors;
  }

  // Get first error for each field
  getFirstErrors(data: Record<string, any>): Record<string, string> {
    const results = this.validateAll(data);
    const errors: Record<string, string> = {};
    
    Object.entries(results).forEach(([field, result]) => {
      if (!result.isValid && result.errors.length > 0) {
        errors[field] = result.errors[0];
      }
    });

    return errors;
  }

  // Clear all rules
  clear(): this {
    this.rules = {};
    return this;
  }

  // Remove rules for a specific field
  removeField(field: string): this {
    delete this.rules[field];
    return this;
  }
}

// Common validation schemas
export const schemas = {
  // Contact form validation
  contact: () => new Validator()
    .addRules('firstName', [validators.required(), validators.minLength(2)])
    .addRules('lastName', [validators.required(), validators.minLength(2)])
    .addRules('email', [validators.required(), validators.email()])
    .addRules('phone', [validators.phone()])
    .addRules('message', [validators.required(), validators.minLength(10)]),

  // User registration validation
  registration: () => new Validator()
    .addRules('firstName', [validators.required(), validators.minLength(2)])
    .addRules('lastName', [validators.required(), validators.minLength(2)])
    .addRules('email', [validators.required(), validators.email()])
    .addRules('password', [validators.required(), validators.password()])
    .addRules('confirmPassword', [validators.required()]),

  // Login validation
  login: () => new Validator()
    .addRules('email', [validators.required(), validators.email()])
    .addRules('password', [validators.required()]),

  // Billing validation
  billing: () => new Validator()
    .addRules('firstName', [validators.required()])
    .addRules('lastName', [validators.required()])
    .addRules('email', [validators.required(), validators.email()])
    .addRules('address.street', [validators.required()])
    .addRules('address.city', [validators.required()])
    .addRules('address.state', [validators.required()])
    .addRules('address.zipCode', [validators.required()])
    .addRules('address.country', [validators.required()]),

  // Lead validation
  lead: () => new Validator()
    .addRules('name', [validators.required(), validators.minLength(2)])
    .addRules('email', [validators.required(), validators.email()])
    .addRules('company', [validators.required()])
    .addRules('division', [validators.required()]),
};

// Utility functions
export const validateEmail = (email: string): boolean => 
  validators.email().test(email);

export const validatePhone = (phone: string): boolean => 
  validators.phone().test(phone);

export const validatePassword = (password: string): boolean => 
  validators.password().test(password);

export const validateRequired = (value: any): boolean => 
  validators.required().test(value);

// Form validation helper
export const createFormValidator = (schema: Record<string, ValidationRule[]>) => {
  const validator = new Validator();
  
  Object.entries(schema).forEach(([field, rules]) => {
    validator.addRules(field, rules);
  });
  
  return validator;
}; 