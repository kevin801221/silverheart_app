import React, { useState } from 'react';
import { Lock, AlertTriangle, Clock, CheckCircle, XCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

interface FreezeTransactionProps {
  onFreeze: (duration: number, options: FreezeOptions) => Promise<void>;
  onUnfreeze: () => Promise<void>;
}

interface FreezeOptions {
  blockAll: boolean;
  blockOnline: boolean;
  blockInternational: boolean;
  maxAmount: number;
}

const FreezeTransaction: React.FC<FreezeTransactionProps> = ({ onFreeze, onUnfreeze }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [freezeStatus, setFreezeStatus] = useState<'idle' | 'confirming' | 'freezing' | 'frozen'>('idle');
  const [duration, setDuration] = useState(24); // 小時
  const [options, setOptions] = useState<FreezeOptions>({
    blockAll: true,
    blockOnline: true,
    blockInternational: true,
    maxAmount: 10000
  });
  const [countdown, setCountdown] = useState<number>(0);

  const handleFreeze = async () => {
    setFreezeStatus('freezing');
    try {
      await onFreeze(duration, options);
      setFreezeStatus('frozen');
      setCountdown(duration * 3600); // 轉換為秒
      startCountdown();
    } catch (error) {
      setFreezeStatus('idle');
      // 處理錯誤
    }
    setIsOpen(false);
  };

  const startCountdown = () => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setFreezeStatus('idle');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatCountdown = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}小時${minutes}分鐘`;
  };

  return (
    <div>
      {freezeStatus === 'frozen' ? (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>帳戶已凍結</AlertTitle>
          <AlertDescription className="space-y-2">
            <p>剩餘凍結時間：{formatCountdown(countdown)}</p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                onUnfreeze();
                setFreezeStatus('idle');
              }}
            >
              提前解凍
            </Button>
          </AlertDescription>
        </Alert>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive" className="w-full flex items-center gap-2">
              <Lock className="w-5 h-5" />
              凍結交易
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-500">
                <AlertTriangle className="w-5 h-5" />
                確認凍結交易
              </DialogTitle>
              <DialogDescription>
                請選擇凍結設置，凍結期間將限制相關交易操作
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* 凍結時長選擇 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">凍結時長: {duration} 小時</label>
                <Slider
                  value={[duration]}
                  onValueChange={(value) => setDuration(value[0])}
                  max={72}
                  min={1}
                  step={1}
                />
              </div>

              {/* 凍結選項 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">完全凍結（所有交易）</label>
                  <Switch
                    checked={options.blockAll}
                    onCheckedChange={(checked) => 
                      setOptions(prev => ({ ...prev, blockAll: checked }))
                    }
                  />
                </div>

                {!options.blockAll && (
                  <>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">凍結線上交易</label>
                      <Switch
                        checked={options.blockOnline}
                        onCheckedChange={(checked) => 
                          setOptions(prev => ({ ...prev, blockOnline: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">凍結跨境交易</label>
                      <Switch
                        checked={options.blockInternational}
                        onCheckedChange={(checked) => 
                          setOptions(prev => ({ ...prev, blockInternational: checked }))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        單筆交易限額: {options.maxAmount.toLocaleString()} 元
                      </label>
                      <Slider
                        value={[options.maxAmount]}
                        onValueChange={(value) => 
                          setOptions(prev => ({ ...prev, maxAmount: value[0] }))
                        }
                        max={100000}
                        min={1000}
                        step={1000}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                取消
              </Button>
              <Button variant="destructive" onClick={handleFreeze}>
                確認凍結
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default FreezeTransaction;