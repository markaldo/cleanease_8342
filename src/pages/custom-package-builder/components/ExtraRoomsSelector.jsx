import React from 'react';
import { useTranslation } from '../../../constants/translations';
import { extraRooms } from '../../../constants/packageBuilder';

const ExtraRoomsSelector = ({ selectedExtraRooms, onExtraRoomsChange }) => {
  const { t } = useTranslation();

  const handleRoomToggle = (roomId) => {
    const isSelected = selectedExtraRooms.some(room => room.id === roomId);
    if (isSelected) {
      onExtraRoomsChange(selectedExtraRooms.filter(room => room.id !== roomId));
    } else {
      const roomData = extraRooms.find(room => room.id === roomId);
      onExtraRoomsChange([...selectedExtraRooms, { ...roomData, size: roomData.hasSize ? '' : null }]);
    }
  };

  const handleSizeChange = (roomId, size) => {
    onExtraRoomsChange(
      selectedExtraRooms.map(room => 
        room.id === roomId ? { ...room, size } : room
      )
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-heading font-semibold text-text-primary">
        {t('extraRooms')}
      </h3>
      
      <div className="space-y-3">
        {extraRooms.map((room) => {
          const isSelected = selectedExtraRooms.some(selected => selected.id === room.id);
          const selectedRoom = selectedExtraRooms.find(selected => selected.id === room.id);
          
          return (
            <div key={room.id} className="space-y-2">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id={room.id}
                  checked={isSelected}
                  onChange={() => handleRoomToggle(room.id)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                />
                <label htmlFor={room.id} className="text-base font-medium text-text-primary">
                  {t(room.name)}
                </label>
              </div>
              
              {isSelected && room.hasSize && (
                <div className="ml-7">
                  <input
                    type="number"
                    placeholder={t('enterSize')}
                    value={selectedRoom?.size || ''}
                    onChange={(e) => handleSizeChange(room.id, e.target.value)}
                    className="w-32 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <span className="ml-2 text-sm text-text-secondary">{t('sizeInSqM')}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExtraRoomsSelector;