# 23307_2023_Saleh_Aerospace_DB

### Aircraft Multidisciplinary Design Optimization (MDO) & Flight Dynamics Platform
**Course Code:** DPR400210 – Database Programming (Final Capstone Examination)  
**Institution:** University of Lay Adventists of Kigali (UNILAK)  
**Faculty:** Computing and Information Sciences  
**Student Registry:** 23307/2023 — Saleh Mahamat
**Instructor:** Eric Maniraguha  

---

## 🚀 System Architecture Overview
An enterprise-grade aerospace engineering platform that tracks structural flight optimization data and aircraft mission vectors. The architecture utilizes a high-performance decoupled pipeline:
* **Frontend UI (Innovation Component):** TanStack Start, React 19, TypeScript, Tailwind CSS, and custom reactive canvas chart rendering for segmented flight profiles.
* **Backend Core Engine:** Python FastAPI with native async connection routing.
* **Database Ledger Engine:** Oracle Database Express Edition using strict relational tables, parameterized packages, and context-aware business integrity constraints.

## 🔑 Database Naming Context
* **Schema/User Registry:** `SALEHMAHAMATHISSE_SCHEMA_1VK72`
* **Local Workspace Target:** `23307_2023_Saleh_Aerospace_DB Engine 0.1.0`

## 🔒 Advanced Database Controls & Business Rules
The database layers embed custom PL/SQL transactional locks to protect live engineering data records during critical core hours:
1. **`TRG_BLOCK_WEEKDAY_OPS` (Phase VII Compliance):** A database trigger that completely blocks `INSERT`, `UPDATE`, and `DELETE` transactions against mission simulations during weekdays (Monday to Friday) and public holidays.
2. **Graceful Exception Catching:** Database blocks raise a clean `ORA-20001` custom application error code which maps into the API layer and renders localized warning structures safely to active engineers.

## 🏗️ Technical Installation & Live Deployment
Ensure your local environment has Python 3.11+ and Node.js active, then spin up the parallel runtime nodes:

### 1. Database Connection Node (Backend API)
```cmd
cd 23307_2023_Saleh_Aerospace_DB
venv\Scripts\activate
python -m uvicorn backend.main:app --reload --port 8000
