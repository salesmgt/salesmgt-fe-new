// Only has alphabet and number between 8 to 30 chars
export const USERNAME_RGX = /^[a-zA-Z0-9]{8,30}$/g
// Has at least 8 chars and contains lowercase, uppercase, number and special chars
export const PWD_RGX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[@$!%*#?&])(?=.{8,})/g
// Only has at least alphabet or number
export const VERIFY_CODE_RGX = /^[a-zA-Z0-9]{10}$/g

// Only has alphabet(vietnamese) and spcae between 4 to 30
// export const FULLNAME_RGX = /^[àảãáạăằẳẵắặâầẩẫấậđèẻẽéẹêềểễếệìỉĩíịòỏõóọôồổỗốộơờởỡớợùủũúụưừửữứựỳỷỹýa-zA-Z]+(?:\s[àảãáạăằẳẵắặâầẩẫấậđèẻẽéẹêềểễếệìỉĩíịòỏõóọôồổỗốộơờởỡớợùủũúụưừửữứựỳỷỹýa-zA-Z]+)*$/g
// /^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/g
// Only has alphabet(vietnamese) and spcae between 3 to 30
// export const SCHOOL_NAME_RGX = /^[àảãáạăằẳẵắặâầẩẫấậđèẻẽéẹêềểễếệìỉĩíịòỏõóọôồổỗốộơờởỡớợùủũúụưừửữứựỳỷỹýĐa-zA-Z]+(?:\s[àảãáạăằẳẵắặâầẩẫấậđèẻẽéẹêềểễếệìỉĩíịòỏõóọôồổỗốộơờởỡớợùủũúụưừửữứựỳỷỹýĐa-zA-Z]+)*$/g

// Has 10 digits and starts with 03, 05, 07, 08, 09
export const PHONE_RGX = /(0[3|5|7|8|9])+([\d]{8})$/g
// Has 11 digits and starts with 02
export const TEL_RGX = /(02)+([\d]{9})$/g

// Only has number 0-9
// export const DURATION_RGX = /^[\d]+$/g
export const DURATION_RGX = /^([1-9])[\d]*$/g
