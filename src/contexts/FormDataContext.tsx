import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface FormData {
  // Page 1
  name?: string;
  rrn?: string;
  phone_person?: string;
  addr?: string;
  occur_time?: string; // YYYYMMDDHHmm 형식
  employ_year?: string;
  employ_month?: string;
  employ_day?: string;
  work_starttime?: string;
  work_endtime?: string;
  job_type?: string;
  
  // Page 2
  bussiness_owner_status?: string; // 사업주여부 (0,1,2)
  family_status?: string; // 친인척여부 (0,1,2)
  
  // Page 3
  apply_category?: string;
  comp_name?: string;
  boss_name?: string;
  comp_contact?: string;
  bussiness_num?: string;
  bussiness_start_num?: string;
  comp_addr?: string;

  //Page 4
  acci_desc?: string;
  police_check?: string;
  fire_check?: string;
  insur_check?: string;

  //Page 5
  witness_name?: string;
  witness_contact?: string;
  witness_relation?: string;
  medical_name1?: string;
  medical_addr1?: string;
  medical_name2?: string;
  medical_addr2?: string;

}

interface FormDataContextType {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  resetFormData: () => void;
  getJsonData: () => string;
}

const FormDataContext = createContext<FormDataContextType | undefined>(undefined);

const STORAGE_KEY = 'medicareFormData';

export const FormDataProvider = ({ children }: { children: ReactNode }) => {
  // sessionStorage에서 초기 데이터 로드
  const [formData, setFormData] = useState<FormData>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error('Failed to load form data from sessionStorage:', error);
      return {};
    }
  });

  // formData가 변경될 때마다 sessionStorage에 저장
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (error) {
      console.error('Failed to save form data to sessionStorage:', error);
    }
  }, [formData]);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const resetFormData = () => {
    setFormData({});
    sessionStorage.removeItem(STORAGE_KEY);
  };

  const getJsonData = () => {
    return JSON.stringify(formData, null, 2);
  };

  return (
    <FormDataContext.Provider value={{ formData, updateFormData, resetFormData, getJsonData }}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error('useFormData must be used within FormDataProvider');
  }
  return context;
};
