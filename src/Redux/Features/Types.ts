
export type ApplicationResponseType = {
    id: number;
    encoded_id: string,
    full_name: string,
    email: string;
    phone_number: string;
    permanent_address: string;
    present_address: string;
    city: string;
    visa_statuses: { id: number, tracking_id: string; visa_status: string; message: string }[];
    appointment : {id : number, interview_date : string | null; start_time : string | null; slot_duration : string; interview_status : 'Cancel' | 'Done' | 'Reschedule', visa_application : number; user : number, schedule_slot : number}[]
    nationality: string;
    occupation: string;
    date_of_birth: string;
    state_province: string;
    marital_status: 'Married' | 'Single' | '';
    educational_background: string;
    postal_code : number
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
    passport_front_photo: string;
    passport_back_photo: string;
    health_ensurence: string;
    travel_insurance: string;
    health_ensurence_url: string;
    applicant_signature: string;
    submission_date: string;
    is_approved: boolean;
    is_modified: boolean;
    rejected: boolean
}

export type adminDashboardCountType = {
    total_approve: number;
    total_reject: number;
    total_application: number;
    under_modified : number
}

type chart_type = {
    visa_type: string;
    count: number
};

export type adminDashboardChartType = {
    total: chart_type[],
    last_week: chart_type[],
    last_month: chart_type[],
    last_year: chart_type[],
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
    postal_code  : number;
    city: string;
    nationality: string;
    occupation: string;
    date_of_birth: string;
    state_province: string;
    marital_status: 'Married' | 'Single' | '';
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
    passport_front_photo: string;
    passport_back_photo: string;
    health_ensurence: string;
    travel_insurance: string;
    applicant_signature: string;
}