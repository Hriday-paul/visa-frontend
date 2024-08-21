
export type ApplicationResponseType = {
    id: number;
    encoded_id : string,
    full_name: string,
    email: string;
    phone_number: string;
    permanent_address: string;
    present_address: string;
    city: string;
    visa_statuses: { id: number, tracking_id: string; visa_status: string; message: string }[]
    nationality: string;
    occupation: string;
    date_of_birth: string;
    state_province: string;
    marital_status: 'Merit' | 'Unmerit' | '';
    educational_background: string;
    gender: 'Male' | 'Female' | 'Others' | '',
    visa_type: 'Tourist' | 'Business' | 'Student' | 'Work' | 'Medical' | 'Family',
    purpose_of_visit: string;
    accommodation_details: string;
    emergency_contact_name: string;
    emergency_contact_relationship: string;
    emergency_contact_phone: string;
    emergency_contact_email: string;
    planned_duration_of_stay: number;
    passport_no: string,
    passport_issue_date: string;
    passport_expiry_date: string;
    country_of_passport_issuance: string;
    user_photo: string;
    passport_photo: string;
    health_ensurence: string;
    travel_insurance: string;
    applicant_signature: string;
    submission_date: string;
    is_approved: boolean;
    is_modified: boolean;
    rejected: boolean
}

export type adminDashboardCountType = {
    total_approve: number;
    total_reject: number;
    total_application: number
}

export type adminDashboardChartType = {
    [key: string]: number,
}
export type adminDashboardVisaPaiChartType = {
    [key: string]: number,
}

export type EditApplicationResponseType = {
    id: number;
    full_name: string,
    email: string;
    phone_number: string;
    permanent_address: string;
    present_address: string;
    city: string;
    nationality: string;
    occupation: string;
    date_of_birth: string;
    state_province: string;
    marital_status: 'Merit' | 'Unmerit' | '';
    educational_background: string;
    gender: 'Male' | 'Female' | 'Others' | '',
    visa_type: 'Tourist' | 'Business' | 'Student' | 'Work' | 'Medical' | 'Family',
    purpose_of_visit: string;
    accommodation_details: string;
    emergency_contact_name: string;
    emergency_contact_relationship: string;
    emergency_contact_phone: string;
    emergency_contact_email: string;
    planned_duration_of_stay: number;
    passport_no: string,
    passport_issue_date: string;
    passport_expiry_date: string;
    country_of_passport_issuance: string;
    user_photo: string;
    passport_photo: string;
    health_ensurence: string;
    travel_insurance: string;
    applicant_signature: string;
}