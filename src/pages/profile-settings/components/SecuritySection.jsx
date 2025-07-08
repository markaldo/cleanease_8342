import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const SecuritySection = ({ isExpanded, onToggle, securitySettings, onUpdateSecurity }) => {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(securitySettings.twoFactorEnabled || false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isEnabling2FA, setIsEnabling2FA] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const validatePasswordForm = () => {
    const errors = {};
    
    if (!passwordForm.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!passwordForm.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordForm.newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordForm.newPassword)) {
      errors.newPassword = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!passwordForm.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordChange = async () => {
    if (!validatePasswordForm()) return;
    
    setIsChangingPassword(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      onUpdateSecurity({ ...securitySettings, lastPasswordChange: new Date().toISOString() });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordErrors({});
    } catch (error) {
      console.error('Failed to change password:', error);
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleToggle2FA = async () => {
    setIsEnabling2FA(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newStatus = !twoFactorEnabled;
      setTwoFactorEnabled(newStatus);
      onUpdateSecurity({ ...securitySettings, twoFactorEnabled: newStatus });
    } catch (error) {
      console.error('Failed to toggle 2FA:', error);
    } finally {
      setIsEnabling2FA(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, this would delete the account
      console.log('Account deletion requested');
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Failed to delete account:', error);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    
    return strength;
  };

  const getStrengthLabel = (strength) => {
    switch (strength) {
      case 0:
      case 1: return { label: 'Weak', color: 'text-error' };
      case 2:
      case 3: return { label: 'Medium', color: 'text-warning' };
      case 4:
      case 5: return { label: 'Strong', color: 'text-success' };
      default: return { label: 'Weak', color: 'text-error' };
    }
  };

  const passwordStrength = getPasswordStrength(passwordForm.newPassword);
  const strengthInfo = getStrengthLabel(passwordStrength);

  return (
    <div className="bg-surface border border-border rounded-lg shadow-elevation-2">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary-50 transition-smooth"
      >
        <div className="flex items-center space-x-3">
          <Icon name="Shield" size={20} className="text-primary" />
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Security Settings
          </h2>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-text-secondary" 
        />
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 border-t border-border">
          <div className="space-y-8">
            {/* Password Change */}
            <div className="space-y-4">
              <h3 className="font-medium text-text-primary">Change Password</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Current Password *
                  </label>
                  <div className="relative">
                    <Input
                      type={showPasswords.current ? "text" : "password"}
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                      placeholder="Enter current password"
                      className={passwordErrors.currentPassword ? 'border-error pr-10' : 'pr-10'}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('current')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
                    >
                      <Icon name={showPasswords.current ? "EyeOff" : "Eye"} size={16} />
                    </button>
                  </div>
                  {passwordErrors.currentPassword && (
                    <p className="mt-1 text-sm text-error">{passwordErrors.currentPassword}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    New Password *
                  </label>
                  <div className="relative">
                    <Input
                      type={showPasswords.new ? "text" : "password"}
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                      placeholder="Enter new password"
                      className={passwordErrors.newPassword ? 'border-error pr-10' : 'pr-10'}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('new')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
                    >
                      <Icon name={showPasswords.new ? "EyeOff" : "Eye"} size={16} />
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {passwordForm.newPassword && (
                    <div className="mt-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-secondary-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              passwordStrength <= 2 ? 'bg-error' :
                              passwordStrength <= 3 ? 'bg-warning' : 'bg-success'
                            }`}
                            style={{ width: `${(passwordStrength / 5) * 100}%` }}
                          />
                        </div>
                        <span className={`text-xs font-medium ${strengthInfo.color}`}>
                          {strengthInfo.label}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {passwordErrors.newPassword && (
                    <p className="mt-1 text-sm text-error">{passwordErrors.newPassword}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Confirm New Password *
                  </label>
                  <div className="relative">
                    <Input
                      type={showPasswords.confirm ? "text" : "password"}
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="Confirm new password"
                      className={passwordErrors.confirmPassword ? 'border-error pr-10' : 'pr-10'}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirm')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
                    >
                      <Icon name={showPasswords.confirm ? "EyeOff" : "Eye"} size={16} />
                    </button>
                  </div>
                  {passwordErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-error">{passwordErrors.confirmPassword}</p>
                  )}
                </div>
              </div>

              <Button
                variant="primary"
                iconName="Key"
                onClick={handlePasswordChange}
                loading={isChangingPassword}
                disabled={isChangingPassword}
              >
                Change Password
              </Button>
            </div>

            {/* Two-Factor Authentication */}
            <div className="space-y-4 border-t border-border pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-text-primary">Two-Factor Authentication</h3>
                  <p className="text-sm text-text-secondary mt-1">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button
                  variant={twoFactorEnabled ? "success" : "outline"}
                  iconName={twoFactorEnabled ? "Shield" : "ShieldOff"}
                  onClick={handleToggle2FA}
                  loading={isEnabling2FA}
                  disabled={isEnabling2FA}
                >
                  {twoFactorEnabled ? 'Enabled' : 'Enable'}
                </Button>
              </div>

              {twoFactorEnabled && (
                <div className="bg-success-50 border border-success-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Icon name="CheckCircle" size={20} className="text-success" />
                    <div>
                      <p className="text-sm font-medium text-success">
                        Two-factor authentication is enabled
                      </p>
                      <p className="text-xs text-success mt-1">
                        Your account is protected with an additional security layer
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Login Sessions */}
            <div className="space-y-4 border-t border-border pt-6">
              <h3 className="font-medium text-text-primary">Active Sessions</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name="Monitor" size={20} className="text-primary" />
                    <div>
                      <p className="text-sm font-medium text-text-primary">Current Session</p>
                      <p className="text-xs text-text-secondary">Chrome on Windows • New York, NY</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-success-100 text-success text-xs rounded-full">
                    Active
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name="Smartphone" size={20} className="text-text-secondary" />
                    <div>
                      <p className="text-sm font-medium text-text-primary">Mobile App</p>
                      <p className="text-xs text-text-secondary">iPhone • Last active 2 hours ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-error hover:text-error">
                    Revoke
                  </Button>
                </div>
              </div>
            </div>

            {/* Account Deletion */}
            <div className="space-y-4 border-t border-border pt-6">
              <div className="bg-error-50 border border-error-200 rounded-lg p-4">
                <h3 className="font-medium text-error mb-2">Danger Zone</h3>
                <p className="text-sm text-error mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                
                {!showDeleteConfirm ? (
                  <Button
                    variant="danger"
                    iconName="Trash2"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    Delete Account
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-error">
                      Are you absolutely sure? This action cannot be undone.
                    </p>
                    <div className="flex space-x-3">
                      <Button
                        variant="danger"
                        iconName="Trash2"
                        onClick={handleDeleteAccount}
                      >
                        Yes, Delete My Account
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => setShowDeleteConfirm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecuritySection;