// Authentication API Types

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterCompanyResponse {
  status: string;
  message: string;
  company: {
    id: string;
    email: string;
    created_at: string | null;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  status: "success";
}

export interface ResendVerificationRequest {
  email: string;
}

export interface VerifyEmailParams {
  id: string;
  token: string;
}


// Staff Management Types

export interface CoreDashboardReport {
  view_dashboard: boolean;
  export_data: boolean;
  generate_export_reports: boolean;
  view_sales_analytics: boolean;
  view_reports: boolean;
}

export interface LeadClientManagement {
  view_leads: boolean;
  view_clients: boolean;
  assign_lead: boolean;
  add_edit_clients: boolean;
  add_edit_leads: boolean;
  assign_client: boolean;
}

export interface OrderTaskManagement {
  view_orders: boolean;
  manage_orders: boolean;
  edit_tasks: boolean;
  create_edit_orders: boolean;
  assign_tasks: boolean;
}

export interface UserRoleManagement {
  view_users: boolean;
  manage_users: boolean;
  add_edit_users: boolean;
  assign_roles: boolean;
}

export interface BillingSubscription {
  view_billing: boolean;
  manage_billing: boolean;
  access_invoice: boolean;
  update_payment_method: boolean;
}

export interface IntegrationsApi {
  access_integration: boolean;
  manage_webhook: boolean;
  manage_api_keys: boolean;
}

export interface CommissionManagement {
  view_commission: boolean;
  approve_commission: boolean;
}

export interface NotificationManagement {
  manage_email_notification: boolean;
  manage_sms_notification: boolean;
}

export interface StaffPermissions {
  core_dashboard_report: CoreDashboardReport;
  lead_client_management: LeadClientManagement;
  order_task_management: OrderTaskManagement;
  user_role_management: UserRoleManagement;
  billing_subscription: BillingSubscription;
  integrations_api: IntegrationsApi;
  commission_management: CommissionManagement;
  notification_management: NotificationManagement;
}

export interface StaffCreateRequest {
  company_id: string;
  full_name: string;
  email: string;
  password: string;
  phone_number: string;
  job_title: string;
  department: string;
  role: string;
  permissions: StaffPermissions;
}

export interface StaffAcceptRequest {
  company_id: string;
  email: string;
}


export interface StaffLoginRequest {
  email: string;
}

export interface StaffLoginResponse {
  message: string;
  staff_id?: string;
  verification_required?: boolean;
}

export interface StaffVerifyResponse {
  message: string;
  access_token?: string;
  refresh_token?: string;
  staff: {
    id: string;
    email: string;
    name?: string;
    permissions?: string[];
  };
}

export interface StaffPermissionUpdateRequest {
  company_id: string;
  staff_id: string;
  permissions: Record<string, boolean>;
}

export interface StaffDeleteRequest {
  company_id: string;
  staff_id: string;
  permissions: Record<string, boolean>;
}
