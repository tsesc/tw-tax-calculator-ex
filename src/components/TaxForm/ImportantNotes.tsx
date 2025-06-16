import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useLanguage } from '../../hooks/useLanguage';

const ImportantNotes: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-orange-600">{t.cardTitles.importantNotes}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-2">{t.importantNotes.disclaimerTitle}</h4>
            <p className="text-sm text-yellow-700 mb-2">
              {t.importantNotes.calculatorReference}
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">{t.importantNotes.documentReminderTitle}</h4>
            <p className="text-sm text-blue-700">
              {t.importantNotes.documentReminder}
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">{t.importantNotes.professionalAdviceTitle}</h4>
            <p className="text-sm text-green-700">
              {t.importantNotes.professionalAdvice}
            </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-800 mb-2">{t.importantNotes.basicLivingProtectionTitle}</h4>
            <p className="text-sm text-purple-700">
              {t.importantNotes.basicLivingProtection}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImportantNotes;