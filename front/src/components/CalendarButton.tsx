import React, { useState } from 'react';  
import DatePicker from 'react-datepicker';  
import 'react-datepicker/dist/react-datepicker.css';  

interface CalendarButtonProps {  
  onSelectDate: (date: Date) => void;  
}  

const CalendarButton: React.FC<CalendarButtonProps> = ({ onSelectDate }) => {  
  const [isOpen, setIsOpen] = useState<boolean>(false);  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);  

  const handleToggle = () => {  
    setIsOpen(prev => !prev);  
  };  

  const handleDateChange = (date: Date | null) => {  
    if (date) {  
      setSelectedDate(date);  
      onSelectDate(date);  
    }  
    setIsOpen(false);  
  };  

  const handleClickOutside = () => {  
    setIsOpen(false);  
  };  

  return (  
    <div style={{ position: 'relative' }}>  
      <button className="CalendarButton" onClick={handleToggle}>  
        {selectedDate ? selectedDate.toLocaleDateString() : 'Selecionar Data'}  
      </button>  
      {isOpen && (  
        <div style={{ position: 'absolute', zIndex: 1000 }}>  
          <DatePicker  
            selected={selectedDate}  
            onChange={handleDateChange}  
            popperPlacement="bottom"  
            inline={false}  
            onClickOutside={handleClickOutside} // Fecha ao clicar fora  
          />  
        </div>  
      )}  
    </div>  
  );  
};  

export default CalendarButton;