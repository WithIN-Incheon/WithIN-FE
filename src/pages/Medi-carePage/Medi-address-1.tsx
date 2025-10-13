import Header from "../../components/Header/Header";
import ContinueButton from "../../components/Login/Button/ContinueButton";
import "./Medi-address-1.css";
import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// 네이버 지오코딩 API 응답 타입 정의
interface Address {
    roadAddress: string;
    jibunAddress: string;
    englishAddress: string;
}

interface GeocodeResponse {
    status: string;
    meta: {
        totalCount: number;
        page: number;
        count: number;
    };
    addresses: Address[];
}

const MediAddress1 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { returnPath, returnToStep, fieldName } = location.state || { 
        returnPath: '/medicare-guide-flow', 
        returnToStep: 1,
        fieldName: 'address' 
    };

    const [searchQuery, setSearchQuery] = useState("");
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [isAddressConfirmed, setIsAddressConfirmed] = useState(false);
    const [detailAddress, setDetailAddress] = useState("");

    // API 호출 함수
    const searchAddress = useCallback(async (query: string) => {
        if (!query.trim()) {
            setAddresses([]);
            return;
        }

        try {
            // 프록시 경로로 변경
            const response = await fetch(
                `/api/geocode?query=${encodeURIComponent(query)}`,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                }
            );

            const data: GeocodeResponse = await response.json();
            
            if (data.status === 'OK' && data.addresses) {
                setAddresses(data.addresses);
            } else {
                setAddresses([]);
            }
        } catch (error) {
            console.error('주소 검색 실패:', error);
            setAddresses([]);
        }
    }, []);

    // 입력 핸들러 (디바운싱 적용)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        
        // 간단한 디바운싱 (500ms 후 검색)
        const timeoutId = setTimeout(() => {
            searchAddress(value);
        }, 500);

        return () => clearTimeout(timeoutId);
    };

    // 주소 선택 핸들러
    const handleSelectAddress = (address: Address) => {
        setSelectedAddress(address);
    };

    // 주소 입력칸 클릭 핸들러 (주소 확정 후 다시 검색)
    const handleAddressInputClick = () => {
        if (isAddressConfirmed) {
            setIsAddressConfirmed(false);
            setSearchQuery("");
            setAddresses([]);
            setSelectedAddress(null);
        }
    };

    const handleNext = () => {
        if (!isAddressConfirmed && selectedAddress) {
            // 첫 번째 확인: 주소 확정
            setSearchQuery(selectedAddress.roadAddress);
            setAddresses([]);
            setIsAddressConfirmed(true);
        } else if (isAddressConfirmed) {
            // 두 번째 확인: 최종 완료 - 원래 페이지로 돌아가기
            const fullAddress = detailAddress 
                ? `${searchQuery} ${detailAddress}`
                : searchQuery;
            
            navigate(returnPath, {
                state: {
                    [fieldName]: fullAddress,
                    returnToStep: returnToStep  // step 정보 전달
                }
            });
        }
    };

    const handleBack = () => {
        // 뒤로가기 로직 - 원래 페이지로 돌아가기
        navigate(returnPath);
    };

    // 상세 주소 입력 핸들러
    const handleDetailAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDetailAddress(e.target.value);
    };

    return (
        <div className="app">
            <Header title="요양 급여 신청 가이드" onBack={handleBack}/>
            <div className="medi-guide-title">
                <h2>주소를 입력해 주세요.</h2>
            </div>
            <div className="medi-guide-content">
                <div className="medi-addr-input">
                    <input 
                        className="medi-addr-input-text" 
                        type="text" 
                        placeholder="주소를 입력하세요"
                        value={searchQuery}
                        onChange={handleInputChange}
                        onClick={handleAddressInputClick}
                        readOnly={isAddressConfirmed}
                    />
                </div>
                
                {/* 주소 검색 결과 - 주소 확정 전에만 표시 */}
                {!isAddressConfirmed && (
                    <div className="medi-addr-result">
                        {addresses.map((address, index) => (
                            <div 
                                key={index}
                                className={`medi-addr-result-box ${selectedAddress === address ? 'selected' : ''}`}
                                onClick={() => handleSelectAddress(address)}
                            >
                                <div className="road-address">{address.roadAddress}</div>
                                <div className="jibun-address">{address.jibunAddress}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 상세 주소 입력 - 주소 확정 후에만 표시 */}
                {isAddressConfirmed && (
                    <div className="medi-addr-input medi-detail-addr">
                        <input 
                            className="medi-addr-input-text" 
                            type="text" 
                            placeholder="상세 주소를 입력하세요"
                            value={detailAddress}
                            onChange={handleDetailAddressChange}
                        />
                    </div>
                )}
            </div>
            <div className="save-button-container">
                <ContinueButton 
                    text="확인" 
                    onClick={handleNext}
                />
            </div>
        </div>
    );
};

export default MediAddress1;