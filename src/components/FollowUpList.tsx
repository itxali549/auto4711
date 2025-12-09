import React, { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Phone, MessageCircle, CheckCircle, AlertTriangle, Clock, Search, Settings } from 'lucide-react';
import { Badge } from './ui/badge';

interface TrackerEntry {
  id: string;
  type: 'income' | 'expense' | 'monthly-income' | 'monthly-expense';
  amount: number;
  customer?: string;
  contact?: string;
  car?: string;
  note?: string;
  timestamp: number;
  customerCode?: string;
  customerSource?: string;
  billFile?: {
    name: string;
    path: string;
    url: string;
  };
  newCustomerDiscount?: {
    eligible: boolean;
    used: boolean;
    applied: boolean;
  };
  monthYear?: string;
  // New fields for service tracking
  registrationNumber?: string;
  serviceType?: string;
  currentKm?: number;
}

type TrackerData = Record<string, TrackerEntry[]>;

interface FollowUp {
  id: string;
  customerName: string;
  customerPhone: string;
  customerCode: string;
  carModel: string;
  registrationNumber: string;
  lastServiceDate: string;
  lastServiceType: string;
  lastKm: number;
  nextServiceKm: number;
  estimatedNextDate: string;
  daysUntilDue: number;
  status: 'upcoming' | 'due' | 'overdue';
  isDone: boolean;
}

interface FollowUpListProps {
  trackerData: TrackerData;
  onBack: () => void;
  onMarkDone: (followUpId: string) => void;
  doneFollowUps: string[];
}

// Default service intervals in KM
const DEFAULT_SERVICE_INTERVALS: Record<string, number> = {
  'oil change': 5000,
  'oil': 5000,
  'engine oil': 5000,
  'filter change': 10000,
  'air filter': 15000,
  'brake service': 20000,
  'brakes': 20000,
  'brake pads': 25000,
  'tire rotation': 10000,
  'tires': 40000,
  'transmission': 50000,
  'coolant': 40000,
  'spark plugs': 50000,
  'timing belt': 100000,
  'battery': 50000,
  'ac service': 20000,
  'ac': 20000,
  'general service': 10000,
  'service': 10000,
  'tuning': 15000,
  'tune up': 15000,
  'default': 10000
};

// Average monthly KM in Karachi
const AVG_MONTHLY_KM = 3750; // Average of 3500-4000

// Load custom interval from localStorage
const getCustomDefaultInterval = (): number => {
  const saved = localStorage.getItem('followup_default_km_interval');
  return saved ? parseInt(saved, 10) : 5000;
};

const FollowUpList: React.FC<FollowUpListProps> = ({ 
  trackerData, 
  onBack, 
  onMarkDone,
  doneFollowUps 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [selectedFollowUp, setSelectedFollowUp] = useState<FollowUp | null>(null);
  const [filter, setFilter] = useState<'all' | 'due' | 'overdue' | 'upcoming'>('all');
  const [showSettings, setShowSettings] = useState(false);
  const [defaultKmInterval, setDefaultKmInterval] = useState(getCustomDefaultInterval);
  const [tempKmInterval, setTempKmInterval] = useState(defaultKmInterval.toString());

  // Calculate next service based on service type
  const getServiceInterval = (serviceType: string): number => {
    const normalizedType = serviceType.toLowerCase().trim();
    
    // Check for specific service types first
    for (const [key, interval] of Object.entries(DEFAULT_SERVICE_INTERVALS)) {
      if (key !== 'default' && normalizedType.includes(key)) {
        return interval;
      }
    }
    // Return custom default interval
    return defaultKmInterval;
  };

  // Save settings
  const handleSaveSettings = () => {
    const value = parseInt(tempKmInterval, 10);
    if (value > 0) {
      setDefaultKmInterval(value);
      localStorage.setItem('followup_default_km_interval', value.toString());
      setShowSettings(false);
    }
  };

  // Calculate estimated date based on KM difference and average monthly usage
  const calculateEstimatedDate = (currentKm: number, nextServiceKm: number, lastServiceDate: string): { date: string; daysUntil: number } => {
    const kmRemaining = nextServiceKm - currentKm;
    const monthsUntilService = kmRemaining / AVG_MONTHLY_KM;
    const daysUntilService = Math.round(monthsUntilService * 30);
    
    const lastDate = new Date(lastServiceDate);
    const estimatedDate = new Date(lastDate);
    estimatedDate.setDate(estimatedDate.getDate() + daysUntilService);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const estDateNormalized = new Date(estimatedDate);
    estDateNormalized.setHours(0, 0, 0, 0);
    
    const daysFromToday = Math.round((estDateNormalized.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    return {
      date: estimatedDate.toISOString().split('T')[0],
      daysUntil: daysFromToday
    };
  };

  // Generate follow-ups from tracker data
  const followUps = useMemo(() => {
    const customerServices: Record<string, FollowUp> = {};
    
    Object.entries(trackerData).forEach(([date, entries]) => {
      entries.forEach(entry => {
        if (entry.type === 'income' && entry.customer && entry.contact) {
          const key = `${entry.customer}-${entry.contact}`.toLowerCase();
          
          // Only track entries with KM data for accurate follow-ups
          // Or use note as service type if no explicit serviceType
          const serviceType = entry.serviceType || entry.note || 'General Service';
          const currentKm = entry.currentKm || 0;
          const registrationNumber = entry.registrationNumber || entry.car || 'N/A';
          
          // Only create follow-up if we have KM data or it's a recent entry
          const entryDate = new Date(date);
          const today = new Date();
          const daysSinceEntry = Math.round((today.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
          
          // Update if this is a more recent entry for this customer
          if (!customerServices[key] || new Date(date) > new Date(customerServices[key].lastServiceDate)) {
            const serviceInterval = getServiceInterval(serviceType);
            const nextServiceKm = currentKm + serviceInterval;
            const { date: estimatedDate, daysUntil } = calculateEstimatedDate(currentKm, nextServiceKm, date);
            
            let status: 'upcoming' | 'due' | 'overdue' = 'upcoming';
            if (daysUntil <= 0) {
              status = 'overdue';
            } else if (daysUntil <= 7) {
              status = 'due';
            }
            
            customerServices[key] = {
              id: `${key}-${date}`,
              customerName: entry.customer,
              customerPhone: entry.contact,
              customerCode: entry.customerCode || '',
              carModel: entry.car || 'N/A',
              registrationNumber,
              lastServiceDate: date,
              lastServiceType: serviceType,
              lastKm: currentKm,
              nextServiceKm,
              estimatedNextDate: estimatedDate,
              daysUntilDue: daysUntil,
              status,
              isDone: doneFollowUps.includes(`${key}-${date}`)
            };
          }
        }
      });
    });
    
    return Object.values(customerServices)
      .filter(f => !f.isDone)
      .sort((a, b) => a.daysUntilDue - b.daysUntilDue);
  }, [trackerData, doneFollowUps]);

  // Filter follow-ups
  const filteredFollowUps = useMemo(() => {
    let filtered = followUps;
    
    if (filter !== 'all') {
      filtered = filtered.filter(f => f.status === filter);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(f => 
        f.customerName.toLowerCase().includes(query) ||
        f.customerPhone.includes(query) ||
        f.carModel.toLowerCase().includes(query) ||
        f.registrationNumber.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [followUps, filter, searchQuery]);

  // Stats
  const stats = useMemo(() => ({
    total: followUps.length,
    overdue: followUps.filter(f => f.status === 'overdue').length,
    due: followUps.filter(f => f.status === 'due').length,
    upcoming: followUps.filter(f => f.status === 'upcoming').length
  }), [followUps]);

  // Generate WhatsApp message
  const generateWhatsAppMessage = (followUp: FollowUp) => {
    const message = `Assalam-o-Alaikum ${followUp.customerName}!

This is a friendly reminder from ZB Autocare.

Your vehicle (${followUp.carModel} - ${followUp.registrationNumber}) is due for its next service:

📅 Service Type: ${followUp.lastServiceType}
🚗 Last Service: ${followUp.lastServiceDate}
📍 Current KM: ${followUp.lastKm.toLocaleString()}
🔧 Next Service at: ${followUp.nextServiceKm.toLocaleString()} KM

Please schedule your appointment to keep your vehicle running smoothly!

Call/WhatsApp: +92-3331385571

Thank you for choosing ZB Autocare! 🚘`;

    return encodeURIComponent(message);
  };

  // Send WhatsApp message
  const handleWhatsApp = (followUp: FollowUp) => {
    const phone = followUp.customerPhone.startsWith('0') 
      ? '92' + followUp.customerPhone.slice(1) 
      : followUp.customerPhone;
    const message = generateWhatsAppMessage(followUp);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  // Make phone call
  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue': return 'bg-destructive text-destructive-foreground';
      case 'due': return 'bg-orange-500 text-white';
      case 'upcoming': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'overdue': return <AlertTriangle className="h-4 w-4" />;
      case 'due': return <Clock className="h-4 w-4" />;
      case 'upcoming': return <CheckCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button onClick={onBack} variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-xl font-bold">Follow-Up List</h1>
          </div>
          <Button onClick={() => setShowSettings(true)} variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>

        {/* Settings Dialog */}
        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Follow-Up Settings</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="defaultKm">Default Service Interval (KM)</Label>
                <Input
                  id="defaultKm"
                  type="number"
                  value={tempKmInterval}
                  onChange={(e) => setTempKmInterval(e.target.value)}
                  placeholder="e.g., 5000"
                />
                <p className="text-xs text-muted-foreground">
                  This value will be used for services that don't have a specific interval defined.
                  Current: {defaultKmInterval.toLocaleString()} KM
                </p>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => {
                  setTempKmInterval(defaultKmInterval.toString());
                  setShowSettings(false);
                }}>
                  Cancel
                </Button>
                <Button onClick={handleSaveSettings}>
                  Save
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => setFilter('all')}>
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-xs text-muted-foreground">Total</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-muted/50 transition-colors border-destructive/50" onClick={() => setFilter('overdue')}>
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-destructive">{stats.overdue}</div>
              <div className="text-xs text-muted-foreground">Overdue</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-muted/50 transition-colors border-orange-500/50" onClick={() => setFilter('due')}>
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-orange-500">{stats.due}</div>
              <div className="text-xs text-muted-foreground">Due Soon</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-muted/50 transition-colors border-primary/50" onClick={() => setFilter('upcoming')}>
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-primary">{stats.upcoming}</div>
              <div className="text-xs text-muted-foreground">Upcoming</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, phone, car..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Badge 
            variant={filter === 'all' ? 'default' : 'outline'}
            className="cursor-pointer px-3 py-2"
            onClick={() => setFilter('all')}
          >
            All
          </Badge>
        </div>

        {/* Follow-up List */}
        <div className="space-y-3">
          {filteredFollowUps.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-12 w-12 mx-auto text-primary mb-4" />
                <h3 className="font-semibold text-lg">No Follow-ups Pending</h3>
                <p className="text-muted-foreground text-sm mt-2">
                  {filter === 'all' 
                    ? 'All customers are up to date with their services!'
                    : `No ${filter} follow-ups at the moment.`}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredFollowUps.map(followUp => (
              <Card key={followUp.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    {/* Status Indicator */}
                    <div className={`p-3 flex items-center justify-center sm:w-24 ${getStatusColor(followUp.status)}`}>
                      <div className="text-center">
                        {getStatusIcon(followUp.status)}
                        <div className="text-xs font-medium mt-1 capitalize">{followUp.status}</div>
                        <div className="text-xs opacity-80">
                          {followUp.daysUntilDue > 0 
                            ? `${followUp.daysUntilDue}d` 
                            : `${Math.abs(followUp.daysUntilDue)}d ago`}
                        </div>
                      </div>
                    </div>
                    
                    {/* Main Content */}
                    <div className="flex-1 p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{followUp.customerName}</h3>
                            {followUp.customerCode && (
                              <Badge variant="outline" className="text-xs">{followUp.customerCode}</Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {followUp.carModel} • {followUp.registrationNumber}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            📞 {followUp.customerPhone}
                          </div>
                        </div>
                        
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between gap-4">
                            <span className="text-muted-foreground">Last Service:</span>
                            <span>{followUp.lastServiceDate}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-muted-foreground">Service Type:</span>
                            <span className="truncate max-w-32">{followUp.lastServiceType}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-muted-foreground">Last KM:</span>
                            <span>{followUp.lastKm.toLocaleString()} km</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-muted-foreground">Next Service:</span>
                            <span className="font-medium">{followUp.nextServiceKm.toLocaleString()} km</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-muted-foreground">Est. Date:</span>
                            <span className="font-medium">{followUp.estimatedNextDate}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-border">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCall(followUp.customerPhone)}
                          className="flex-1 sm:flex-none"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white flex-1 sm:flex-none"
                          onClick={() => handleWhatsApp(followUp)}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          WhatsApp
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => onMarkDone(followUp.id)}
                          className="flex-1 sm:flex-none"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark Done
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Info Card */}
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <h4 className="font-medium text-sm mb-2">📊 How Follow-ups Work</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Service intervals are calculated based on service type (Oil: 5,000km, General: 10,000km, etc.)</li>
              <li>• Estimated dates assume average Karachi driving of ~3,750 km/month</li>
              <li>• <span className="text-destructive font-medium">Overdue</span>: Past estimated service date</li>
              <li>• <span className="text-orange-500 font-medium">Due Soon</span>: Within 7 days</li>
              <li>• <span className="text-primary font-medium">Upcoming</span>: More than 7 days away</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FollowUpList;
