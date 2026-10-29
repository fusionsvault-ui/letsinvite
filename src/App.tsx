import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { FeaturedTemplates } from './components/home/FeaturedTemplates';
import { CategoryShowcase } from './components/home/CategoryShowcase';
import { HowItWorks } from './components/home/HowItWorks';
import { PricingSection } from './components/home/PricingSection';
import { TemplateGallery } from './components/gallery/TemplateGallery';
import { PhonePreview } from './components/invitation/PhonePreview';
import { InvitationEditor } from './components/editor/InvitationEditor';
import { PricingPage } from './components/pricing/PricingPage';
import { SavedInvitations } from './components/invitation/SavedInvitations';
import { InvitationExperience } from './components/invitation/InvitationExperience';

import { TEMPLATES, getTemplateById } from './data/templates';
import { BENCHMARK_INVITATION, SAMPLE_INVITATIONS } from './data/sampleInvitations';
import { InvitationData, InvitationTemplate } from './types';
import { getCurrentDraft, getSavedInvitations, saveCurrentDraft } from './utils/storage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [currentInvitation, setCurrentInvitation] = useState<InvitationData>(BENCHMARK_INVITATION);
  const [selectedTemplate, setSelectedTemplate] = useState<InvitationTemplate>(
    getTemplateById(BENCHMARK_INVITATION.templateId)
  );

  // Check URL query params on initial load
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const pageParam = params.get('page');
      const templateParam = params.get('template');
      const inviteIdParam = params.get('id');

      if (templateParam) {
        const found = getTemplateById(templateParam);
        setSelectedTemplate(found);
      }

      if (inviteIdParam) {
        const allSaved = getSavedInvitations();
        const foundInvite = allSaved.find((i) => i.id === inviteIdParam);
        if (foundInvite) {
          setCurrentInvitation(foundInvite);
          setSelectedTemplate(getTemplateById(foundInvite.templateId));
        }
      }

      if (pageParam === 'invite') {
        setCurrentPage('invite');
      } else if (pageParam) {
        setCurrentPage(pageParam);
      } else {
        const savedDraft = getCurrentDraft();
        if (savedDraft) {
          setCurrentInvitation(savedDraft);
          setSelectedTemplate(getTemplateById(savedDraft.templateId));
        }
      }
    } catch (e) {
      console.warn('URL parsing error', e);
    }
  }, []);

  const handleNavigate = (page: string, category?: string) => {
    setCurrentPage(page);
    if (category) {
      setCategoryFilter(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTemplateForPreview = (tmpl: InvitationTemplate) => {
    setSelectedTemplate(tmpl);
    // Create preview data matching template
    const previewData: InvitationData = {
      ...currentInvitation,
      templateId: tmpl.id,
      eventTitle:
        tmpl.category === 'Classic'
          ? 'Festive Mehendi & Nikah Celebration'
          : tmpl.category === 'Royal'
          ? 'Royal Wedding Ceremony & Banquet'
          : 'Wedding Reception & Celebration',
    };
    setCurrentInvitation(previewData);
    setCurrentPage('preview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCustomizeTemplate = (tmpl: InvitationTemplate) => {
    setSelectedTemplate(tmpl);
    const updated: InvitationData = {
      ...currentInvitation,
      templateId: tmpl.id,
    };
    setCurrentInvitation(updated);
    saveCurrentDraft(updated);
    setCurrentPage('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f2] text-[#392922] font-lora">
      {/* Top Navigation Bar - Hidden on pure guest invite and full-screen preview view */}
      {currentPage !== 'invite' && currentPage !== 'preview' && (
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      )}

      {/* Main Content Router */}
      <main className="flex-1">
        {/* PAGE 1: HOME */}
        {currentPage === 'home' && (
          <>
            <Hero
              onExplore={() => handleNavigate('gallery', 'All')}
              onCreate={() => handleNavigate('editor')}
              onViewDemo={() => handleSelectTemplateForPreview(TEMPLATES[0])}
            />

            <FeaturedTemplates
              onSelectTemplate={handleSelectTemplateForPreview}
              onCustomizeTemplate={handleCustomizeTemplate}
              onViewAll={() => handleNavigate('gallery', 'All')}
            />

            <CategoryShowcase
              onSelectCategory={(cat) => handleNavigate('gallery', cat)}
            />

            <HowItWorks />

            <PricingSection
              onSelectPlan={(planId) => {
                handleNavigate('editor');
              }}
            />
          </>
        )}

        {/* PAGE 2: TEMPLATE GALLERY */}
        {currentPage === 'gallery' && (
          <TemplateGallery
            initialCategory={categoryFilter}
            onSelectTemplate={handleSelectTemplateForPreview}
            onCustomizeTemplate={handleCustomizeTemplate}
          />
        )}

        {/* PAGE 3: PHONE PREVIEW */}
        {currentPage === 'preview' && (
          <PhonePreview
            invitation={currentInvitation}
            template={selectedTemplate}
            onBack={() => handleNavigate('gallery', selectedTemplate.category)}
            onCustomize={() => handleCustomizeTemplate(selectedTemplate)}
          />
        )}

        {/* PAGE 4: INVITATION EDITOR */}
        {currentPage === 'editor' && (
          <InvitationEditor
            initialInvitation={currentInvitation}
            onPreviewInvitation={(inv) => {
              setCurrentInvitation(inv);
              setSelectedTemplate(getTemplateById(inv.templateId));
              setCurrentPage('preview');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* PAGE 5: PRICING */}
        {currentPage === 'pricing' && (
          <PricingPage
            onSelectPlan={(planId) => {
              handleNavigate('editor');
            }}
          />
        )}

        {/* PAGE 6: SAVED INVITATIONS & RSVPS */}
        {currentPage === 'saved' && (
          <SavedInvitations
            onPreview={(inv) => {
              setCurrentInvitation(inv);
              setSelectedTemplate(getTemplateById(inv.templateId));
              setCurrentPage('preview');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onEdit={(inv) => {
              setCurrentInvitation(inv);
              setSelectedTemplate(getTemplateById(inv.templateId));
              setCurrentPage('editor');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onCreateNew={() => handleNavigate('editor')}
          />
        )}

        {/* SPECIAL ROUTE: DIRECT GUEST INVITATION PAGE */}
        {currentPage === 'invite' && (
          <div className="w-full min-h-screen">
            <InvitationExperience
              invitation={currentInvitation}
              template={selectedTemplate}
              isStandalone={true}
              onUseTemplate={() => handleCustomizeTemplate(selectedTemplate)}
            />
          </div>
        )}
      </main>

      {/* Footer - Hidden on pure guest invite and full-screen preview view */}
      {currentPage !== 'invite' && currentPage !== 'preview' && (
        <Footer onNavigate={handleNavigate} />
      )}
    </div>
  );
}
