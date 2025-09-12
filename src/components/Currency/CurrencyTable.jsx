import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { t } from '../../utils/i18n';
import {
  tableContainer,
  tableBase,
  trHeader,
  trStriped,
  thBase,
  tdBase,
  btnBase,
  btnPrimary,
  btnDanger,
  statusTag
} from '../../styles/tableStyles';

const CurrencyTable = ({ currencies, onEdit, onDelete }) => {
  return (
    <div style={tableContainer}>
      <table style={tableBase}>
        <thead>
          <tr style={trHeader}>
            <th style={thBase}>{t('currency.code')}</th>
            <th style={thBase}>{t('currency.name')}</th>
            <th style={thBase}>{t('currency.symbol')}</th>
            <th style={thBase}>{t('currency.rate')}</th>
            <th style={thBase}>{t('currency.status')}</th>
            <th style={thBase}>{t('common.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map((currency, index) => (
            <tr key={currency.id} style={trStriped(index)}>
              <td style={{...tdBase, fontWeight: '500'}}>{currency.code}</td>
              <td style={tdBase}>{currency.name}</td>
              <td style={tdBase}>{currency.symbol}</td>
              <td style={{...tdBase, fontWeight: '500'}}>{currency.rate}</td>
              <td style={tdBase}>
                <span style={statusTag(currency.status === 1 ? 'success' : 'warning')}>
                  {currency.status === 1 ? t('common.active') : t('common.inactive')}
                </span>
              </td>
              <td style={tdBase}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => onEdit(currency)}
                    style={{
                      ...btnBase,
                      ...btnPrimary,
                      padding: '0.375rem 0.75rem'
                    }}
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(currency.id)}
                    style={{
                      ...btnBase,
                      ...btnDanger,
                      padding: '0.375rem 0.75rem'
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyTable;