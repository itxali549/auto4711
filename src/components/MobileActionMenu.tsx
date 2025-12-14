import React from 'react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { MoreVertical, Calendar, Eye, Trash2 } from 'lucide-react';

interface MobileActionMenuProps {
  onMonthly: () => void;
  onViewDay: () => void;
  onClearAll: () => void;
}

const MobileActionMenu: React.FC<MobileActionMenuProps> = ({
  onMonthly,
  onViewDay,
  onClearAll
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-10 w-10">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-popover z-50">
        <DropdownMenuItem onClick={onMonthly} className="h-11">
          <Calendar className="h-4 w-4 mr-2" />
          Monthly Entry
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onViewDay} className="h-11">
          <Eye className="h-4 w-4 mr-2" />
          View Day Summary
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onClearAll} className="h-11 text-destructive">
          <Trash2 className="h-4 w-4 mr-2" />
          Clear All Data
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileActionMenu;
