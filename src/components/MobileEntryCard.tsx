import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Eye, Trash2, Edit } from 'lucide-react';

interface MobileEntryCardProps {
  type: 'income' | 'expense';
  entry: {
    id: string;
    type: string;
    customer?: string;
    contact?: string;
    car?: string;
    note?: string;
    amount: number;
    billFile?: {
      name: string;
      path: string;
      url: string;
    };
  };
  onDelete: (id: string) => void;
  onViewBill?: (path: string, name: string) => void;
  onEdit?: (id: string) => void;
}

const MobileEntryCard: React.FC<MobileEntryCardProps> = ({
  type,
  entry,
  onDelete,
  onViewBill,
  onEdit
}) => {
  const isMonthly = entry.type === 'monthly-income' || entry.type === 'monthly-expense';
  
  return (
    <Card className="mb-3">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                isMonthly 
                  ? type === 'income' 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'
                  : type === 'income'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
                    : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200'
              }`}>
                {isMonthly ? 'Monthly' : 'Daily'}
              </span>
            </div>
            
            {type === 'income' && entry.customer && (
              <p className="font-medium text-sm truncate">{entry.customer}</p>
            )}
            
            {type === 'income' && entry.car && (
              <p className="text-xs text-muted-foreground truncate">{entry.car}</p>
            )}
            
            {entry.note && (
              <p className="text-xs text-muted-foreground mt-1 truncate">
                {entry.note}
              </p>
            )}
          </div>
          
          <div className={`text-base font-bold ${type === 'income' ? 'text-income' : 'text-expense'}`}>
            Rs {entry.amount}
          </div>
        </div>
        
        <div className="flex gap-2 mt-3 pt-3 border-t border-border">
          {entry.billFile && onViewBill && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onViewBill(entry.billFile!.path, entry.billFile!.name)}
              className="flex-1 h-10"
            >
              <Eye className="h-4 w-4 mr-1" />
              View Bill
            </Button>
          )}
          {onEdit && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(entry.id)}
              className="flex-1 h-10"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          )}
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(entry.id)}
            className="flex-1 h-10"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileEntryCard;
