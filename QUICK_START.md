# 🚀 Quick Start Guide - Candidate Pre-onboarding System

## ⚡ Fast Track Setup (5 Minutes)

### Step 1: Verify Installation ✅
Your server is already running! Tables are created!

```bash
# Check server health
curl http://localhost:3000/api/health
```

### Step 2: Open Swagger UI
```
http://localhost:3000/api-docs
```

Look for tag: **"Candidates & Pre-onboarding"**

### Step 3: Setup Default Tasks (One Time Only)

In Swagger UI, execute:
```
POST /api/preonboarding/tasks/setup-defaults
Authorization: Bearer <your-admin-token>
```

✅ This creates 15 default pre-onboarding tasks automatically!

---

## 📝 Complete Example Workflow

### 1. Create Candidate
```http
POST /api/candidates
Content-Type: application/json
Authorization: Bearer <token>

{
  "first_name": "Alice",
  "last_name": "Johnson", 
  "email": "alice@example.com",
  "phone": "1234567890",
  "position": "Software Engineer",
  "designation_id": 1,
  "department_id": 1,
  "location_id": 1,
  "offered_ctc": 800000,
  "joining_date": "2024-03-15"
}
```

**Response**: `{ success: true, candidate_id: 1 }`

---

### 2. Send Offer Letter
```http
POST /api/candidates/1/send-offer
Authorization: Bearer <token>
```

---

### 3. Candidate Accepts Offer
```http
POST /api/candidates/1/accept-offer
(No auth required - candidate action)
```

**✨ Auto-magic**: All pre-onboarding tasks automatically assigned!

---

### 4. View Candidate Progress
```http
GET /api/candidates/1
```

**Response includes**:
- Candidate details
- Document list with verification status
- Task list with completion %

---

### 5. Upload Documents (Candidate)
```http
POST /api/candidates/1/documents
Content-Type: multipart/form-data

file: [select file]
document_type: "resume"
```

---

### 6. HR Verifies Document
```http
PUT /api/candidates/documents/1/verify
Authorization: Bearer <hr-token>

{
  "remarks": "Document verified"
}
```

---

### 7. Initiate Background Verification
```http
POST /api/candidates/1/bgv/initiate
Authorization: Bearer <hr-token>
```

---

### 8. Complete BGV
```http
PUT /api/candidates/1/bgv/status
Authorization: Bearer <hr-token>

{
  "bgv_status": "completed",
  "remarks": "All checks passed"
}
```

---

### 9. Convert to Employee
```http
POST /api/candidates/1/convert-to-employee
Authorization: Bearer <hr-token>

{
  "employee_number": "EMP12345"
}
```

**✨ Auto-magic creates**:
- ✅ Employee record in employees table
- ✅ User account (username: alice, password: welcome123)
- ✅ Onboarding steps assigned
- ✅ Links candidate to employee

---

### 10. Employee Sets Password
```http
POST /api/onboarding/set-password

{
  "username": "alice",
  "password": "NewPassword@123",
  "confirm_password": "NewPassword@123"
}
```

---

## 📊 Dashboard Queries

### Get All Candidates
```http
GET /api/candidates
GET /api/candidates?status=offer_accepted
GET /api/candidates?department_id=1
GET /api/candidates?joining_date_from=2024-03-01&joining_date_to=2024-03-31
```

### Dashboard Statistics
```http
GET /api/candidates/stats/dashboard
```

**Returns**:
```json
{
  "total_candidates": 50,
  "offered": 15,
  "offer_accepted": 20,
  "in_bgv": 10,
  "ready_to_join": 3,
  "joined": 2,
  "declined_dropped": 0
}
```

### Candidate Task Progress
```http
GET /api/preonboarding/progress/1
```

**Returns**:
```json
{
  "tasks": [
    {
      "id": 1,
      "task_name": "Upload Photo",
      "status": "completed",
      "assigned_date": "2024-01-15",
      "completed_date": "2024-01-16"
    }
  ],
  "stats": {
    "total": 10,
    "completed": 6,
    "pending": 4,
    "completion_percentage": "60.00"
  }
}
```

---

## 🎯 15 Default Pre-onboarding Tasks

When you run `/api/preonboarding/tasks/setup-defaults`, these are created:

### 📄 Document Submission (Candidate):
1. ✓ Accept Offer Letter
2. ✓ Upload Photo
3. ✓ Upload Resume
4. ✓ Upload ID Proof (PAN Card)
5. ✓ Upload Address Proof (Aadhar)
6. ✓ Upload Education Certificates
7. Upload Experience Certificates *(optional)*
8. Upload Relieving Letter *(optional)*
9. Upload Last 3 Months Salary Slips *(optional)*
10. ✓ Upload Bank Details

### 📝 Form Filling (Candidate):
11. ✓ Fill Personal Information Form
12. ✓ Emergency Contact Details

### ✅ Verification (Candidate):
13. ✓ Background Verification Consent

### 🔍 Verification (HR):
14. ✓ Verify Documents (HR task)
15. ✓ Initiate Background Verification (HR task)

✓ = Mandatory tasks

---

## 🔑 Important Concepts

### Auto-Assignment
Tasks with `auto_assign=1` are automatically assigned when candidate accepts offer.

### Status Flow
```
offered → offer_accepted → documents_pending → 
bgv_initiated → bgv_completed → ready_to_join → joined
```

### Role-Based Access
- **Admin**: Everything
- **HR**: Candidate management, verification
- **Candidate**: No auth required for accept/decline/upload

### Default Credentials
- New employees get password: `welcome123`
- They should change it immediately via `/api/onboarding/set-password`

---

## 🎨 Swagger UI Features

Visit: http://localhost:3000/api-docs

Features:
- ✅ All 22 endpoints documented
- ✅ Try-it-out feature
- ✅ Request/response examples
- ✅ Authentication support
- ✅ Schema definitions

**How to use**:
1. Click "Authorize" button (top right)
2. Enter: `Bearer <your-jwt-token>`
3. Try any endpoint with "Try it out"

---

## ⚠️ Common Issues & Solutions

### Issue: "Unauthorized" error
**Solution**: Login first to get token
```http
POST /api/login
{ "username": "admin", "password": "admin123" }
```

### Issue: Foreign key constraint error
**Solution**: Ensure designation_id, department_id, location_id exist in master tables

### Issue: Tasks not auto-assigned
**Solution**: Make sure you ran `/api/preonboarding/tasks/setup-defaults` first

### Issue: Cannot upload document
**Solution**: Use `multipart/form-data` content type, not JSON

---

## 📈 Production Tips

### Before Going Live:
1. ✅ Setup default tasks
2. ✅ Verify all master data (departments, designations, locations)
3. ✅ Test complete workflow end-to-end
4. ✅ Setup email notifications (future enhancement)
5. ✅ Configure file upload limits
6. ✅ Setup backup for candidate_documents

### Security:
- Change admin password from default
- Use HTTPS in production
- Set appropriate CORS policies
- Implement rate limiting
- Add file type validation for uploads
- Sanitize file names

---

## 📞 Quick Reference

### All Endpoints Summary:

**Candidates (13)**:
- `POST /api/candidates` - Create
- `GET /api/candidates` - List
- `GET /api/candidates/:id` - Details
- `PUT /api/candidates/:id` - Update
- `POST /api/candidates/:id/send-offer` - Send offer
- `POST /api/candidates/:id/accept-offer` - Accept
- `POST /api/candidates/:id/decline-offer` - Decline
- `POST /api/candidates/:id/documents` - Upload doc
- `PUT /api/candidates/documents/:docId/verify` - Verify doc
- `POST /api/candidates/:id/bgv/initiate` - Start BGV
- `PUT /api/candidates/:id/bgv/status` - Update BGV
- `POST /api/candidates/:id/convert-to-employee` - Convert
- `GET /api/candidates/stats/dashboard` - Stats

**Pre-onboarding (9)**:
- `POST /api/preonboarding/tasks` - Create task template
- `GET /api/preonboarding/tasks` - List templates
- `PUT /api/preonboarding/tasks/:id` - Update template
- `DELETE /api/preonboarding/tasks/:id` - Delete template
- `POST /api/preonboarding/assign/:candidateId` - Assign tasks
- `GET /api/preonboarding/progress/:candidateId` - Get progress
- `PUT /api/preonboarding/progress/:progressId` - Update progress
- `POST /api/preonboarding/tasks/setup-defaults` - **Setup defaults**

---

## 🎉 You're Ready!

Your candidate pre-onboarding system is **fully operational**!

**Next Actions**:
1. Open Swagger UI: http://localhost:3000/api-docs
2. Run setup-defaults endpoint
3. Create your first candidate
4. Test the complete workflow

**Need help?** Check:
- `CANDIDATE_PREONBOARDING_ONBOARDING_README.md` - Full documentation
- `IMPLEMENTATION_COMPLETE.md` - Implementation details
- Swagger UI - Interactive API docs

---

**Happy Hiring! 🎊**
