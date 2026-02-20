<?php
// app/Http/Controllers/DashboardController.php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\GbvCase;
use App\Models\Survivor;
use App\Models\Partner;
use App\Models\Referral;
use App\Models\CaseFile;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    /**
     * Display dashboard based on user role
     */
    public function index()
    {
        $user = Auth::user();

        return match ($user->role) {
            User::ROLE_SUPER_ADMIN => $this->superAdminDashboard(),
            User::ROLE_ADMIN => $this->adminDashboard(),
            User::ROLE_GBV_OFFICER => $this->gbvOfficerDashboard(),
            User::ROLE_SOCIAL_WORKER => $this->socialWorkerDashboard(),
            User::ROLE_HOSPITAL_STAFF => $this->hospitalStaffDashboard(),
            User::ROLE_POLICE_OFFICER => $this->policeOfficerDashboard(),
            User::ROLE_NGO_STAFF => $this->ngoStaffDashboard(),
            User::ROLE_VIEWER => $this->viewerDashboard(),
            default => $this->defaultDashboard(),
        };
    }

    /**
     * Get user permissions safely
     */
    private function getUserPermissions()
    {
        $user = Auth::user();

        // try {
        //     // Check if user has roles and permissions loaded
        //     if ($user->relationLoaded('roles') || $user->roles()->exists()) {
        //         return $user->getAllPermissions()->pluck('name');
        //     }
        // } catch (\Exception $e) {
        //     // Fallback to empty collection if error
        // }

        // Return permissions based on role as fallback
        return match ($user->role) {
            User::ROLE_SUPER_ADMIN => collect(['*']), // All permissions
            User::ROLE_ADMIN => collect([
                'view cases',
                'create cases',
                'edit cases',
                'view survivors',
                'create survivors',
                'edit survivors',
                'view reports',
                'export reports',
            ]),
            User::ROLE_GBV_OFFICER => collect([
                'view cases',
                'create cases',
                'edit cases',
                'view survivors',
                'create survivors',
                'view referrals',
                'create referrals',
            ]),
            User::ROLE_SOCIAL_WORKER => collect([
                'view cases',
                'view survivors',
                'create survivors',
                'edit survivors',
                'view referrals',
                'create referrals',
            ]),
            User::ROLE_HOSPITAL_STAFF => collect([
                'view cases',
                'view survivors',
                'create case files',
                'view case files',
                'edit case files',
                'view referrals',
                'create referrals',
            ]),
            User::ROLE_POLICE_OFFICER => collect([
                'view cases',
                'create cases',
                'edit cases',
                'create case files',
                'view case files',
                'view referrals',
                'create referrals',
            ]),
            User::ROLE_NGO_STAFF => collect([
                'view cases',
                'view survivors',
                'create case files',
                'view case files',
                'view referrals',
                'create referrals',
            ]),
            User::ROLE_VIEWER => collect([
                'view cases',
                'view survivors',
                'view reports',
            ]),
            default => collect([]),
        };
    }

    /**
     * Super Admin Dashboard
     */
    private function superAdminDashboard()
    {
        return Inertia::render('Dashboard/SuperAdmin', [
            'stats' => [
                'keyMetrics' => [
                    'totalCases' => GbvCase::count(),
                    'activeCases' => GbvCase::whereNotIn('status', ['concluded', 'closed'])->count(),
                    'concludedCases' => GbvCase::where('status', 'concluded')->count(),
                    'totalSurvivors' => Survivor::count(),
                    'totalPartners' => Partner::count(),
                    'totalReferrals' => Referral::count(),
                    'pendingReferrals' => Referral::where('status', 'pending')->count(),
                    'totalUsers' => User::count(),
                ],
                'systemHealth' => [
                    'activeUsers' => User::where('is_active', true)->count(),
                    'pendingApprovals' => Partner::where('status', 'pending')->count(),
                    'storageUsed' => $this->getStorageUsage(),
                    'apiCallsToday' => 1542,
                    'systemUptime' => '99.9%',
                    'lastBackup' => now()->subHours(5)->format('Y-m-d H:i'),
                ],
                'geographicDistribution' => $this->getGeographicDistribution(),
                'partnerPerformance' => $this->getPartnerPerformance(),
                'caseTrends' => $this->getCaseTrends(12),
                'caseDistribution' => $this->getCaseDistribution(),
                'ageDisaggregation' => $this->getAgeDisaggregation(),
                'pwdStatistics' => [
                    'total' => Survivor::where('is_pwd', true)->count(),
                    'byType' => $this->getPwdByType(),
                    'casesInvolved' => GbvCase::whereHas('survivor', fn($q) => $q->where('is_pwd', true))->count(),
                ],
                'responseTimes' => $this->getResponseTimes(),
                'recentActivities' => $this->getRecentActivities(10),
                'alerts' => $this->getSystemAlerts(),
                'securityOverview' => [
                    'failedLogins' => 23,
                    'suspiciousActivities' => 2,
                    'lockedAccounts' => User::where('locked_until', '>', now())->count(),
                ],
            ],
            'userPermissions' => $this->getUserPermissions(),
        ]);
    }

    /**
     * Admin Dashboard
     */
    private function adminDashboard()
    {
        return Inertia::render('Dashboard/Admin', [
            'stats' => [
                'keyMetrics' => [
                    'totalCases' => GbvCase::count(),
                    'activeCases' => GbvCase::whereNotIn('status', ['concluded', 'closed'])->count(),
                    'concludedCases' => GbvCase::where('status', 'concluded')->count(),
                    'totalSurvivors' => Survivor::count(),
                    'totalPartners' => Partner::count(),
                    'pendingApprovals' => Partner::where('status', 'pending')->count(),
                    'urgentCases' => GbvCase::where('priority', 'critical')->whereNotIn('status', ['concluded', 'closed'])->count(),
                    'referralsToday' => Referral::whereDate('created_at', today())->count(),
                ],
                'caseDistribution' => $this->getCaseDistribution(),
                'ageDisaggregation' => $this->getAgeDisaggregation(),
                'pwdStatistics' => [
                    'total' => Survivor::where('is_pwd', true)->count(),
                ],
                'geographicDistribution' => $this->getGeographicDistribution(),
                'recentActivities' => $this->getRecentActivities(8),
                'alerts' => $this->getOperationalAlerts(),
                'partnerMetrics' => [
                    'hospitals' => Partner::where('organization_type', 'hospital')->count(),
                    'police' => Partner::where('organization_type', 'police')->count(),
                    'ngos' => Partner::where('organization_type', 'ngo')->count(),
                    'shelters' => Partner::where('organization_type', 'shelter')->count(),
                ],
                'caseTrends' => $this->getCaseTrends(6),
            ],
            'userPermissions' => $this->getUserPermissions(),
        ]);
    }

    /**
     * GBV Officer Dashboard
     */
    private function gbvOfficerDashboard()
    {
        $userId = Auth::id();

        return Inertia::render('Dashboard/GbvOfficer', [
            'stats' => [
                'myCases' => [
                    'total' => GbvCase::where('primary_officer_id', $userId)->count(),
                    'active' => GbvCase::where('primary_officer_id', $userId)
                        ->whereNotIn('status', ['concluded', 'closed'])
                        ->count(),
                    'critical' => GbvCase::where('primary_officer_id', $userId)
                        ->where('priority', 'critical')
                        ->whereNotIn('status', ['concluded', 'closed'])
                        ->count(),
                    'concluded' => GbvCase::where('primary_officer_id', $userId)
                        ->where('status', 'concluded')
                        ->count(),
                ],
                'recentCases' => GbvCase::with(['survivor', 'primaryOfficer'])
                    ->where('primary_officer_id', $userId)
                    ->latest()
                    ->limit(5)
                    ->get()
                    ->map(fn($case) => [
                        'id' => $case->id,
                        'case_number' => $case->case_number,
                        'survivor' => $case->survivor ? $case->survivor->getAnonymousName() : 'Unknown',
                        'incident_type' => $case->incident_type,
                        'status' => $case->status,
                        'priority' => $case->priority,
                        'created_at' => $case->created_at->diffForHumans(),
                    ]),
                'pendingReferrals' => Referral::whereHas('gbvCase', fn($q) => $q->where('primary_officer_id', $userId))
                    ->where('status', 'pending')
                    ->count(),
                'todayTasks' => [
                    'followUps' => 3,
                    'interviews' => 2,
                    'reportSubmissions' => 1,
                ],
                'caseDistribution' => $this->getOfficerCaseDistribution($userId),
                'recentActivities' => $this->getUserRecentActivities($userId, 5),
                'performanceMetrics' => [
                    'avgResponseTime' => $this->getOfficerAvgResponseTime($userId),
                    'closureRate' => $this->getOfficerClosureRate($userId),
                    'successfulReferrals' => Referral::whereHas('gbvCase', fn($q) => $q->where('primary_officer_id', $userId))
                        ->where('status', 'completed')
                        ->count(),
                ],
            ],
            'userPermissions' => $this->getUserPermissions(),
        ]);
    }

    /**
     * Social Worker Dashboard
     */
    private function socialWorkerDashboard()
    {
        $userId = Auth::id();

        return Inertia::render('Dashboard/SocialWorker', [
            'stats' => [
                'survivorMetrics' => [
                    'totalAssigned' => Survivor::where('created_by', $userId)->count(),
                    'activeCases' => GbvCase::whereHas('survivor', fn($q) => $q->where('created_by', $userId))
                        ->whereNotIn('status', ['concluded', 'closed'])
                        ->count(),
                    'pwdSurvivors' => Survivor::where('created_by', $userId)
                        ->where('is_pwd', true)
                        ->count(),
                    'children_0_16' => Survivor::where('created_by', $userId)
                        ->where('age_bracket', '0-16')
                        ->count(),
                ],
                'recentSurvivors' => Survivor::where('created_by', $userId)
                    ->latest()
                    ->limit(5)
                    ->get()
                    ->map(fn($survivor) => [
                        'id' => $survivor->id,
                        'name' => $survivor->getAnonymousName(),
                        'age_bracket' => $survivor->age_bracket,
                        'is_pwd' => $survivor->is_pwd,
                        'created_at' => $survivor->created_at->diffForHumans(),
                    ]),
                'supportServices' => [
                    'counselling' => 12,
                    'shelter' => 3,
                    'legalAid' => 5,
                    'economic' => 4,
                ],
                'pendingFollowUps' => $this->getPendingFollowUps($userId),
                'ageDisaggregation' => $this->getSocialWorkerAgeData($userId),
                'pwdBreakdown' => $this->getSocialWorkerPwdData($userId),
                'recentActivities' => $this->getUserRecentActivities($userId, 5),
            ],
            'userPermissions' => $this->getUserPermissions(),
        ]);
    }

    /**
     * Hospital Staff Dashboard
     */
    private function hospitalStaffDashboard()
    {
        $user = Auth::user();
        $partnerId = $user->partner_id;

        return Inertia::render('Dashboard/HospitalStaff', [
            'stats' => [
                'medicalMetrics' => [
                    'totalCases' => GbvCase::whereHas(
                        'caseFiles',
                        fn($q) =>
                        $q->where('partner_id', $partnerId)
                            ->where('file_type', 'medical_report')
                    )->count(),
                    'pendingExams' => CaseFile::where('partner_id', $partnerId)
                        ->where('file_type', 'medical_report')
                        ->where('status', 'draft')
                        ->count(),
                    'completedExams' => CaseFile::where('partner_id', $partnerId)
                        ->where('file_type', 'medical_report')
                        ->where('status', 'approved')
                        ->count(),
                    'urgentMedical' => GbvCase::whereHas(
                        'caseFiles',
                        fn($q) =>
                        $q->where('partner_id', $partnerId)
                    )->where('priority', 'critical')->count(),
                ],
                'recentMedicalFiles' => CaseFile::with(['gbvCase', 'gbvCase.survivor'])
                    ->where('partner_id', $partnerId)
                    ->where('file_type', 'medical_report')
                    ->latest()
                    ->limit(5)
                    ->get()
                    ->map(fn($file) => [
                        'id' => $file->id,
                        'case_number' => $file->gbvCase ? $file->gbvCase->case_number : 'N/A',
                        'survivor' => $file->gbvCase && $file->gbvCase->survivor ? $file->gbvCase->survivor->getAnonymousName() : 'Unknown',
                        'status' => $file->status,
                        'created_at' => $file->created_at->diffForHumans(),
                    ]),
                'medicalStats' => [
                    'byType' => $this->getMedicalStatsByType($partnerId),
                    'avgProcessingTime' => '2.5h',
                    'consentRate' => 95,
                ],
                'pendingReferrals' => Referral::where('to_partner_id', $partnerId)
                    ->where('referral_type', 'medical')
                    ->where('status', 'pending')
                    ->count(),
                'recentActivities' => $this->getPartnerRecentActivities($partnerId, 5),
            ],
            'userPermissions' => $this->getUserPermissions(),
        ]);
    }

    /**
     * Police Officer Dashboard
     */
    private function policeOfficerDashboard()
    {
        $user = Auth::user();
        $partnerId = $user->partner_id;

        return Inertia::render('Dashboard/PoliceOfficer', [
            'stats' => [
                'investigationMetrics' => [
                    'totalCases' => GbvCase::whereHas(
                        'caseFiles',
                        fn($q) =>
                        $q->where('partner_id', $partnerId)
                            ->where('file_type', 'police_report')
                    )->count(),
                    'underInvestigation' => GbvCase::where('status', 'under_investigation')
                        ->whereHas(
                            'caseFiles',
                            fn($q) =>
                            $q->where('partner_id', $partnerId)
                        )->count(),
                    'legalProceedings' => GbvCase::where('status', 'legal_proceedings')
                        ->whereHas(
                            'caseFiles',
                            fn($q) =>
                            $q->where('partner_id', $partnerId)
                        )->count(),
                    'statementsPending' => CaseFile::where('partner_id', $partnerId)
                        ->where('file_type', 'statement')
                        ->where('status', 'draft')
                        ->count(),
                ],
                'recentPoliceFiles' => CaseFile::with(['gbvCase', 'gbvCase.survivor'])
                    ->where('partner_id', $partnerId)
                    ->where('file_type', 'police_report')
                    ->latest()
                    ->limit(5)
                    ->get()
                    ->map(fn($file) => [
                        'id' => $file->id,
                        'case_number' => $file->gbvCase ? $file->gbvCase->case_number : 'N/A',
                        'incident_type' => $file->gbvCase ? $file->gbvCase->incident_type : 'N/A',
                        'status' => $file->status,
                        'created_at' => $file->created_at->diffForHumans(),
                    ]),
                'evidenceStats' => [
                    'totalEvidence' => CaseFile::where('partner_id', $partnerId)
                        ->where('file_type', 'evidence')->count(),
                    'pendingReview' => 3,
                ],
                'courtCases' => [
                    'pending' => 5,
                    'upcoming' => 2,
                    'concluded' => 8,
                ],
                'recentActivities' => $this->getPartnerRecentActivities($partnerId, 5),
            ],
            'userPermissions' => $this->getUserPermissions(),
        ]);
    }

    /**
     * NGO Staff Dashboard
     */
    private function ngoStaffDashboard()
    {
        $user = Auth::user();
        $partnerId = $user->partner_id;

        return Inertia::render('Dashboard/NgoStaff', [
            'stats' => [
                'supportMetrics' => [
                    'totalBeneficiaries' => Survivor::whereHas(
                        'cases.caseFiles',
                        fn($q) =>
                        $q->where('partner_id', $partnerId)
                    )->count(),
                    'activeSupport' => GbvCase::whereHas(
                        'caseFiles',
                        fn($q) =>
                        $q->where('partner_id', $partnerId)
                    )->whereNotIn('status', ['concluded', 'closed'])->count(),
                    'counselling' => CaseFile::where('partner_id', $partnerId)
                        ->where('file_type', 'counselling_notes')->count(),
                    'shelterProvided' => GbvCase::where('status', 'shelter_provided')
                        ->whereHas(
                            'caseFiles',
                            fn($q) =>
                            $q->where('partner_id', $partnerId)
                        )->count(),
                ],
                'recentSupport' => CaseFile::with(['gbvCase', 'gbvCase.survivor'])
                    ->where('partner_id', $partnerId)
                    ->whereIn('file_type', ['counselling_notes', 'shelter_intake'])
                    ->latest()
                    ->limit(5)
                    ->get()
                    ->map(fn($file) => [
                        'id' => $file->id,
                        'case_number' => $file->gbvCase ? $file->gbvCase->case_number : 'N/A',
                        'file_type' => $file->file_type,
                        'status' => $file->status,
                        'created_at' => $file->created_at->diffForHumans(),
                    ]),
                'referralNetwork' => [
                    'incoming' => Referral::where('to_partner_id', $partnerId)->count(),
                    'outgoing' => Referral::where('from_partner_id', $partnerId)->count(),
                    'completed' => Referral::where('to_partner_id', $partnerId)
                        ->where('status', 'completed')->count(),
                ],
                'demographicData' => [
                    'ageBreakdown' => $this->getNgoAgeBreakdown($partnerId),
                    'pwdCount' => $this->getNgoPwdCount($partnerId),
                ],
                'recentActivities' => $this->getPartnerRecentActivities($partnerId, 5),
            ],
            'userPermissions' => $this->getUserPermissions(),
        ]);
    }

    /**
     * Viewer Dashboard
     */
    private function viewerDashboard()
    {
        return Inertia::render('Dashboard/Viewer', [
            'stats' => [
                'overviewStats' => [
                    'totalCases' => GbvCase::count(),
                    'activeCases' => GbvCase::whereNotIn('status', ['concluded', 'closed'])->count(),
                    'totalSurvivors' => Survivor::count(),
                    'totalPartners' => Partner::where('status', 'approved')->count(),
                ],
                'caseTrends' => $this->getCaseTrends(6),
                'caseDistribution' => $this->getCaseDistribution(),
                'ageDisaggregation' => $this->getAgeDisaggregation(),
                'geographicDistribution' => $this->getGeographicDistribution(),
                'publicReports' => [
                    'monthlyReports' => GbvCase::select(
                        DB::raw('YEAR(created_at) as year'),
                        DB::raw('MONTH(created_at) as month'),
                        DB::raw('COUNT(*) as total')
                    )
                        ->groupBy('year', 'month')
                        ->orderBy('year', 'desc')
                        ->orderBy('month', 'desc')
                        ->limit(12)
                        ->get(),
                ],
            ],
            'userPermissions' => $this->getUserPermissions(),
        ]);
    }

    /**
     * Default Dashboard (fallback)
     */
    private function defaultDashboard()
    {
        return Inertia::render('Dashboard/Default', [
            'stats' => [
                'message' => 'Welcome to GBV Management System',
                'totalCases' => GbvCase::count(),
            ],
            'userPermissions' => $this->getUserPermissions(),
        ]);
    }

    // ==================== HELPER METHODS ====================

    private function getStorageUsage()
    {
        $totalSize = CaseFile::sum('file_size') ?? 0;
        $totalGB = round($totalSize / (1024 * 1024 * 1024), 2);
        $limit = 100;

        return [
            'used' => $totalGB,
            'limit' => $limit,
            'percentage' => round(($totalGB / $limit) * 100, 2),
        ];
    }

    private function getGeographicDistribution()
    {
        return GbvCase::select('incident_sub_county', DB::raw('count(*) as total'))
            ->whereNotNull('incident_sub_county')
            ->groupBy('incident_sub_county')
            ->orderByDesc('total')
            ->limit(5)
            ->get();
    }

    private function getPartnerPerformance()
    {
        return Partner::withCount(['caseFiles', 'sentReferrals', 'receivedReferrals'])
            ->limit(5)
            ->get()
            ->map(fn($partner) => [
                'name' => $partner->organization_name,
                'type' => $partner->organization_type,
                'files' => $partner->case_files_count,
                'referrals_sent' => $partner->sent_referrals_count,
                'referrals_received' => $partner->received_referrals_count,
            ]);
    }

    private function getCaseTrends($months = 6)
    {
        $trends = [];

        for ($i = $months - 1; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $startOfMonth = $date->copy()->startOfMonth();
            $endOfMonth = $date->copy()->endOfMonth();

            $trends[] = [
                'month' => $date->format('M Y'),
                'new' => GbvCase::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count(),
                'concluded' => GbvCase::whereBetween('concluded_at', [$startOfMonth, $endOfMonth])->count(),
                'referrals' => Referral::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count(),
            ];
        }

        return $trends;
    }

    private function getCaseDistribution()
    {
        return GbvCase::select('incident_type', DB::raw('count(*) as total'))
            ->groupBy('incident_type')
            ->orderByDesc('total')
            ->get()
            ->map(fn($item) => [
                'name' => str_replace('_', ' ', ucwords($item->incident_type)),
                'value' => $item->total,
            ]);
    }

    private function getAgeDisaggregation()
    {
        return Survivor::select('age_bracket', DB::raw('count(*) as total'))
            ->whereNotNull('age_bracket')
            ->groupBy('age_bracket')
            ->orderBy('age_bracket')
            ->get();
    }

    private function getPwdByType()
    {
        return Survivor::select('pwd_type', DB::raw('count(*) as total'))
            ->where('is_pwd', true)
            ->whereNotNull('pwd_type')
            ->groupBy('pwd_type')
            ->get();
    }

    private function getResponseTimes()
    {
        return [
            'avg_first_response' => '2.5h',
            'avg_case_closure' => '45 days',
            'avg_referral_response' => '1.2h',
        ];
    }

    private function getRecentActivities($limit = 10)
    {
        $activities = collect();

        GbvCase::with('primaryOfficer')->latest()->limit($limit)->get()->each(function ($case) use ($activities) {
            $activities->push([
                'user' => $case->primaryOfficer?->name ?? 'System',
                'action' => 'Case ' . $case->status,
                'target' => $case->case_number,
                'time' => $case->updated_at->diffForHumans(),
                'type' => 'case',
            ]);
        });

        Referral::with('createdBy')->latest()->limit($limit)->get()->each(function ($referral) use ($activities) {
            $activities->push([
                'user' => $referral->createdBy?->name ?? 'System',
                'action' => 'Referral ' . $referral->status,
                'target' => $referral->referral_number,
                'time' => $referral->updated_at->diffForHumans(),
                'type' => 'referral',
            ]);
        });

        return $activities->sortByDesc('time')->take($limit)->values();
    }

    private function getUserRecentActivities($userId, $limit)
    {
        $activities = collect();

        GbvCase::where('primary_officer_id', $userId)
            ->latest()
            ->limit($limit)
            ->get()
            ->each(function ($case) use ($activities) {
                $activities->push([
                    'action' => 'Updated case',
                    'target' => $case->case_number,
                    'time' => $case->updated_at->diffForHumans(),
                ]);
            });

        return $activities->sortByDesc('time')->take($limit)->values();
    }

    private function getPartnerRecentActivities($partnerId, $limit)
    {
        $activities = collect();

        CaseFile::where('partner_id', $partnerId)
            ->latest()
            ->limit($limit)
            ->get()
            ->each(function ($file) use ($activities) {
                $activities->push([
                    'action' => $file->file_type . ' ' . $file->status,
                    'target' => $file->file_number,
                    'time' => $file->updated_at->diffForHumans(),
                ]);
            });

        return $activities->sortByDesc('time')->take($limit)->values();
    }

    private function getSystemAlerts()
    {
        $alerts = [];

        $unassignedCritical = GbvCase::where('priority', 'critical')
            ->whereNull('primary_officer_id')
            ->count();
        if ($unassignedCritical > 0) {
            $alerts[] = [
                'type' => 'danger',
                'title' => 'Unassigned Critical Cases',
                'message' => "{$unassignedCritical} critical case(s) need immediate assignment",
                'time' => now()->diffForHumans(),
            ];
        }

        $storage = $this->getStorageUsage();
        if ($storage['percentage'] > 80) {
            $alerts[] = [
                'type' => 'warning',
                'title' => 'Storage Almost Full',
                'message' => "Storage at {$storage['percentage']}% ({$storage['used']}GB / {$storage['limit']}GB)",
                'time' => now()->diffForHumans(),
            ];
        }

        $pendingPartners = Partner::where('status', 'pending')->count();
        if ($pendingPartners > 0) {
            $alerts[] = [
                'type' => 'info',
                'title' => 'Pending Approvals',
                'message' => "{$pendingPartners} partner(s) awaiting approval",
                'time' => now()->diffForHumans(),
            ];
        }

        return $alerts;
    }

    private function getOperationalAlerts()
    {
        $alerts = [];

        $urgentCases = GbvCase::where('priority', 'critical')
            ->whereNotIn('status', ['concluded', 'closed'])
            ->count();
        if ($urgentCases > 0) {
            $alerts[] = [
                'type' => 'danger',
                'message' => "{$urgentCases} urgent case(s) require attention",
                'time' => now()->diffForHumans(),
            ];
        }

        $pendingReferrals = Referral::where('status', 'pending')->count();
        if ($pendingReferrals > 5) {
            $alerts[] = [
                'type' => 'warning',
                'message' => "{$pendingReferrals} pending referrals need action",
                'time' => now()->diffForHumans(),
            ];
        }

        return $alerts;
    }

    private function getOfficerCaseDistribution($userId)
    {
        return GbvCase::where('primary_officer_id', $userId)
            ->select('incident_type', DB::raw('count(*) as total'))
            ->groupBy('incident_type')
            ->get()
            ->map(fn($item) => [
                'name' => str_replace('_', ' ', ucwords($item->incident_type)),
                'value' => $item->total,
            ]);
    }

    private function getOfficerAvgResponseTime($userId)
    {
        $avgMinutes = GbvCase::where('primary_officer_id', $userId)
            ->whereHas('caseFiles')
            ->with('caseFiles')
            ->get()
            ->avg(function ($case) {
                $firstFile = $case->caseFiles->sortBy('created_at')->first();
                return $firstFile ? $firstFile->created_at->diffInMinutes($case->created_at) : null;
            });

        if (!$avgMinutes)
            return 'N/A';

        $hours = floor($avgMinutes / 60);
        $minutes = $avgMinutes % 60;

        return "{$hours}h {$minutes}m";
    }

    private function getOfficerClosureRate($userId)
    {
        $total = GbvCase::where('primary_officer_id', $userId)->count();
        if ($total === 0)
            return 0;

        $concluded = GbvCase::where('primary_officer_id', $userId)
            ->where('status', 'concluded')
            ->count();

        return round(($concluded / $total) * 100);
    }

    private function getPendingFollowUps($userId)
    {
        return [
            'today' => 2,
            'thisWeek' => 5,
            'overdue' => 1,
        ];
    }

    private function getSocialWorkerAgeData($userId)
    {
        return Survivor::where('created_by', $userId)
            ->select('age_bracket', DB::raw('count(*) as total'))
            ->whereNotNull('age_bracket')
            ->groupBy('age_bracket')
            ->orderBy('age_bracket')
            ->get();
    }

    private function getSocialWorkerPwdData($userId)
    {
        return Survivor::where('created_by', $userId)
            ->where('is_pwd', true)
            ->select('pwd_type', DB::raw('count(*) as total'))
            ->whereNotNull('pwd_type')
            ->groupBy('pwd_type')
            ->get();
    }

    private function getMedicalStatsByType($partnerId)
    {
        return CaseFile::where('partner_id', $partnerId)
            ->where('file_type', 'medical_report')
            ->select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->get()
            ->pluck('total', 'status');
    }

    private function getNgoAgeBreakdown($partnerId)
    {
        return Survivor::whereHas('cases.caseFiles', fn($q) => $q->where('partner_id', $partnerId))
            ->select('age_bracket', DB::raw('count(*) as total'))
            ->whereNotNull('age_bracket')
            ->groupBy('age_bracket')
            ->orderBy('age_bracket')
            ->get();
    }

    private function getNgoPwdCount($partnerId)
    {
        return Survivor::whereHas('cases.caseFiles', fn($q) => $q->where('partner_id', $partnerId))
            ->where('is_pwd', true)
            ->count();
    }
}