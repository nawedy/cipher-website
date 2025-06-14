// src/lib/lead-scoring.ts
// Advanced lead scoring algorithm with predictive capabilities

import { LeadFormData, LeadScore, ScoreFactor, LeadScoringConfig, LeadEngagement } from '@/types/lead-scoring';

export class LeadScoringEngine {
  private config: LeadScoringConfig;

  constructor(config?: Partial<LeadScoringConfig>) {
    this.config = {
      weights: {
        companySize: 0.20,
        budget: 0.25,
        timeline: 0.15,
        painPoints: 0.20,
        techCompatibility: 0.10,
        engagement: 0.10,
      },
      thresholds: {
        hot: 80,
        warm: 60,
        cold: 40,
      },
      version: '1.0',
      ...config,
    };
  }

  public calculateScore(
    formData: LeadFormData,
    engagement?: LeadEngagement
  ): LeadScore {
    const factors: ScoreFactor[] = [];
    
    // Calculate individual scores
    const companyScore = this.calculateCompanyScore(formData, factors);
    const budgetScore = this.calculateBudgetScore(formData, factors);
    const timelineScore = this.calculateTimelineScore(formData, factors);
    const painPointScore = this.calculatePainPointScore(formData, factors);
    const techCompatibilityScore = this.calculateTechCompatibilityScore(formData, factors);
    const engagementScore = this.calculateEngagementScore(engagement, factors);

    // Calculate weighted total score
    const totalScore = Math.round(
      companyScore * this.config.weights.companySize +
      budgetScore * this.config.weights.budget +
      timelineScore * this.config.weights.timeline +
      painPointScore * this.config.weights.painPoints +
      techCompatibilityScore * this.config.weights.techCompatibility +
      engagementScore * this.config.weights.engagement
    );

    // Determine classification
    const classification = this.classifyLead(totalScore);
    
    // Calculate confidence based on data completeness and consistency
    const confidence = this.calculateConfidence(formData, factors);

    return {
      id: crypto.randomUUID(),
      leadId: '', // Will be set by caller
      totalScore,
      classification,
      confidence,
      companyScore,
      budgetScore,
      timelineScore,
      painPointScore,
      techCompatibilityScore,
      engagementScore,
      calculatedAt: new Date(),
      version: this.config.version,
      factors,
    };
  }

  private calculateCompanyScore(formData: LeadFormData, factors: ScoreFactor[]): number {
    let score = 0;
    const baseScore = 50;

    // Company size scoring
    const sizeScores = {
      startup: 60,
      small: 70,
      medium: 85,
      enterprise: 95,
    };

    score = sizeScores[formData.companySize] || baseScore;

    factors.push({
      category: 'Company',
      factor: 'Company Size',
      weight: this.config.weights.companySize,
      value: score,
      impact: score * this.config.weights.companySize,
      reason: `${formData.companySize} companies typically have higher success rates`,
    });

    // Industry vertical adjustment
    const highValueIndustries = [
      'technology', 'fintech', 'healthcare', 'saas', 'ecommerce',
      'finance', 'consulting', 'manufacturing'
    ];

    if (highValueIndustries.some(industry => 
      formData.industry.toLowerCase().includes(industry)
    )) {
      score = Math.min(100, score + 10);
      factors.push({
        category: 'Company',
        factor: 'Industry Vertical',
        weight: 0.05,
        value: 10,
        impact: 10 * 0.05,
        reason: `${formData.industry} is a high-value industry vertical`,
      });
    }

    return Math.min(100, Math.max(0, score));
  }

  private calculateBudgetScore(formData: LeadFormData, factors: ScoreFactor[]): number {
    const budgetScores = {
      'under-10k': 30,
      '10k-50k': 60,
      '50k-100k': 80,
      '100k-500k': 95,
      '500k+': 100,
    };

    const score = budgetScores[formData.budget] || 30;

    factors.push({
      category: 'Budget',
      factor: 'Budget Range',
      weight: this.config.weights.budget,
      value: score,
      impact: score * this.config.weights.budget,
      reason: `${formData.budget} budget range indicates strong purchasing power`,
    });

    return score;
  }

  private calculateTimelineScore(formData: LeadFormData, factors: ScoreFactor[]): number {
    const timelineScores = {
      immediate: 100,
      'within-month': 85,
      'within-quarter': 70,
      'within-year': 45,
    };

    let score = timelineScores[formData.timeline] || 30;

    // Urgency multiplier
    const urgencyMultiplier = 1 + (formData.urgency - 3) * 0.1;
    score = Math.min(100, score * urgencyMultiplier);

    factors.push({
      category: 'Timeline',
      factor: 'Project Timeline',
      weight: this.config.weights.timeline,
      value: score,
      impact: score * this.config.weights.timeline,
      reason: `${formData.timeline} timeline with urgency ${formData.urgency}/5`,
    });

    return Math.round(score);
  }

  private calculatePainPointScore(formData: LeadFormData, factors: ScoreFactor[]): number {
    if (!formData.painPoints || formData.painPoints.length === 0) {
      factors.push({
        category: 'Pain Points',
        factor: 'Pain Point Identification',
        weight: this.config.weights.painPoints,
        value: 20,
        impact: 20 * this.config.weights.painPoints,
        reason: 'No specific pain points identified',
      });
      return 20;
    }

    // High-impact pain points that indicate strong buying intent
    const highImpactPainPoints = [
      'revenue growth', 'cost reduction', 'efficiency', 'automation',
      'competitive advantage', 'scalability', 'security', 'compliance',
      'customer experience', 'data insights'
    ];

    let painPointScore = 40; // Base score for having pain points
    let highImpactCount = 0;

    formData.painPoints.forEach(painPoint => {
      if (highImpactPainPoints.some(hip => 
        painPoint.toLowerCase().includes(hip)
      )) {
        highImpactCount++;
      }
    });

    // Severity adjustment
    if (formData.painPointSeverity) {
      const avgSeverity = Object.values(formData.painPointSeverity)
        .reduce((sum, severity) => sum + severity, 0) / 
        Object.values(formData.painPointSeverity).length;
      
      painPointScore += avgSeverity * 10;
    }

    // High-impact pain points bonus
    painPointScore += highImpactCount * 15;

    const finalScore = Math.min(100, painPointScore);

    factors.push({
      category: 'Pain Points',
      factor: 'Pain Point Analysis',
      weight: this.config.weights.painPoints,
      value: finalScore,
      impact: finalScore * this.config.weights.painPoints,
      reason: `${formData.painPoints.length} pain points identified, ${highImpactCount} high-impact`,
    });

    return finalScore;
  }

  private calculateTechCompatibilityScore(formData: LeadFormData, factors: ScoreFactor[]): number {
    if (!formData.currentTech || formData.currentTech.length === 0) {
      factors.push({
        category: 'Technology',
        factor: 'Tech Stack Compatibility',
        weight: this.config.weights.techCompatibility,
        value: 50,
        impact: 50 * this.config.weights.techCompatibility,
        reason: 'No current technology stack specified',
      });
      return 50;
    }

    // Technologies that indicate good compatibility with our services
    const compatibleTech = {
      'high': ['react', 'nextjs', 'typescript', 'nodejs', 'python', 'supabase', 'postgresql'],
      'medium': ['javascript', 'html', 'css', 'mysql', 'mongodb', 'firebase'],
      'emerging': ['ai', 'machine learning', 'automation', 'api', 'cloud'],
    };

    let score = 30; // Base score
    let compatibilityLevel = 'none';

    const techStack = formData.currentTech.map(tech => tech.toLowerCase());

    // Check for high compatibility
    const highCompatCount = compatibleTech.high.filter(tech =>
      techStack.some(userTech => userTech.includes(tech))
    ).length;

    if (highCompatCount > 0) {
      score += highCompatCount * 20;
      compatibilityLevel = 'high';
    }

    // Check for medium compatibility
    const medCompatCount = compatibleTech.medium.filter(tech =>
      techStack.some(userTech => userTech.includes(tech))
    ).length;

    if (medCompatCount > 0) {
      score += medCompatCount * 10;
      if (compatibilityLevel === 'none') compatibilityLevel = 'medium';
    }

    // Check for emerging tech interest
    const emergingCount = compatibleTech.emerging.filter(tech =>
      techStack.some(userTech => userTech.includes(tech))
    ).length;

    if (emergingCount > 0) {
      score += emergingCount * 15;
      if (compatibilityLevel === 'none') compatibilityLevel = 'emerging';
    }

    const finalScore = Math.min(100, score);

    factors.push({
      category: 'Technology',
      factor: 'Tech Stack Compatibility',
      weight: this.config.weights.techCompatibility,
      value: finalScore,
      impact: finalScore * this.config.weights.techCompatibility,
      reason: `${compatibilityLevel} compatibility with ${formData.currentTech.length} technologies`,
    });

    return finalScore;
  }

  private calculateEngagementScore(engagement: LeadEngagement | undefined, factors: ScoreFactor[]): number {
    if (!engagement) {
      factors.push({
        category: 'Engagement',
        factor: 'User Engagement',
        weight: this.config.weights.engagement,
        value: 50,
        impact: 50 * this.config.weights.engagement,
        reason: 'No engagement data available',
      });
      return 50;
    }

    let score = 0;

    // Page views scoring
    const pageViewScore = Math.min(30, engagement.pageViews.length * 3);
    score += pageViewScore;

    // Email interaction scoring
    const emailScore = Math.min(40, engagement.emailInteractions.length * 8);
    score += emailScore;

    // Time-based engagement scoring
    const totalTimeOnSite = engagement.pageViews.reduce((total, pv) => total + pv.timeOnPage, 0);
    const timeScore = Math.min(30, totalTimeOnSite / 60); // 1 point per minute, max 30
    score += timeScore;

    factors.push({
      category: 'Engagement',
      factor: 'User Engagement',
      weight: this.config.weights.engagement,
      value: score,
      impact: score * this.config.weights.engagement,
      reason: `${engagement.pageViews.length} page views, ${engagement.emailInteractions.length} email interactions`,
    });

    return Math.min(100, score);
  }

  private classifyLead(score: number): 'hot' | 'warm' | 'cold' | 'nurture' {
    if (score >= this.config.thresholds.hot) return 'hot';
    if (score >= this.config.thresholds.warm) return 'warm';
    if (score >= this.config.thresholds.cold) return 'cold';
    return 'nurture';
  }

  private calculateConfidence(formData: LeadFormData, factors: ScoreFactor[]): number {
    let completeness = 0;
    const requiredFields = 12; // Total important fields
    let filledFields = 0;

    // Check field completeness
    if (formData.firstName) filledFields++;
    if (formData.email) filledFields++;
    if (formData.company) filledFields++;
    if (formData.position) filledFields++;
    if (formData.division) filledFields++;
    if (formData.services?.length > 0) filledFields++;
    if (formData.companySize) filledFields++;
    if (formData.industry) filledFields++;
    if (formData.budget) filledFields++;
    if (formData.timeline) filledFields++;
    if (formData.painPoints?.length > 0) filledFields++;
    if (formData.projectDescription) filledFields++;

    completeness = (filledFields / requiredFields) * 100;

    // Factor consistency check
    const consistencyScore = this.checkDataConsistency(formData);

    // Combine completeness and consistency
    const confidence = Math.round((completeness * 0.7) + (consistencyScore * 0.3));

    return Math.min(100, Math.max(0, confidence));
  }

  private checkDataConsistency(formData: LeadFormData): number {
    let consistencyScore = 100;

    // Check budget vs company size consistency
    if (formData.companySize === 'startup' && 
        ['100k-500k', '500k+'].includes(formData.budget)) {
      consistencyScore -= 20;
    }

    if (formData.companySize === 'enterprise' && 
        formData.budget === 'under-10k') {
      consistencyScore -= 30;
    }

    // Check timeline vs urgency consistency
    if (formData.timeline === 'within-year' && formData.urgency >= 4) {
      consistencyScore -= 15;
    }

    if (formData.timeline === 'immediate' && formData.urgency <= 2) {
      consistencyScore -= 15;
    }

    return Math.max(0, consistencyScore);
  }

  // Update scoring configuration
  public updateConfig(newConfig: Partial<LeadScoringConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  // Get current configuration
  public getConfig(): LeadScoringConfig {
    return { ...this.config };
  }
}