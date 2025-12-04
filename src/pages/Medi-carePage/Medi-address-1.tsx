import Header from "../../components/Header/Header";
import ContinueButton from "../../components/Login/Button/ContinueButton";
import { useLocalization } from "../../contexts/LocalizationContext";
import "./Medi-address-1.css";
import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// 카카오 주소 검색 응답 타입 
interface Address {
    roadAddress: string;
    jibunAddress: string;
    englishAddress?: string;
}

interface GeocodeResponse {
    documents: {
        address_name: string;
        road_address: {
            address_name: string;
        } | null;
        address: {
            address_name: string;
        } | null;
    }[];
}

const MediAddress1 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useLocalization();

    const { returnPath, returnToStep, fieldName } = location.state || {
        returnPath: "/medicare-guide-flow",
        returnToStep: 1,
        fieldName: "address",
    };

    const [searchQuery, setSearchQuery] = useState("");
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [isAddressConfirmed, setIsAddressConfirmed] = useState(false);
    const [detailAddress, setDetailAddress] = useState("");

    // 카카오 지오코딩
    const searchAddress = useCallback(async (query: string) => {
        if (!query.trim()) {
            setAddresses([]);
            return;
        }

        try {
            const response = await fetch(
                `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
                    query
                )}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `KakaoAK ${
                            import.meta.env.VITE_KAKAO_REST_API_KEY
                        }`,
                    },
                }
            );

            const data: GeocodeResponse = await response.json();

            if (data.documents && data.documents.length > 0) {
                const parsed = data.documents.map((doc) => ({
                    roadAddress: doc.road_address?.address_name ?? "",
                    jibunAddress: doc.address?.address_name ?? "",
                    englishAddress: "",
                }));

                setAddresses(parsed);
            } else {
                setAddresses([]);
            }
        } catch (error) {
            console.error("주소 검색 실패:", error);
            setAddresses([]);
        }
    }, []);

    //  입력 디바운스
    let debounceTimer: number | undefined;
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (debounceTimer) clearTimeout(debounceTimer);

        debounceTimer = window.setTimeout(() => {
            searchAddress(value);
        }, 500);
    };

    // 주소 선택
    const handleSelectAddress = (address: Address) => {
        setSelectedAddress(address);
    };

    // 주소 확정 후 다시 클릭하면 초기화
    const handleAddressInputClick = () => {
        if (isAddressConfirmed) {
            setIsAddressConfirmed(false);
            setSearchQuery("");
            setAddresses([]);
            setSelectedAddress(null);
        }
    };

    // 다음 버튼
    const handleNext = () => {
        if (!isAddressConfirmed && selectedAddress) {
            setSearchQuery(selectedAddress.roadAddress);
            setAddresses([]);
            setIsAddressConfirmed(true);
        } else if (isAddressConfirmed) {
            const fullAddress = detailAddress
                ? `${searchQuery} ${detailAddress}`
                : searchQuery;

            navigate(returnPath, {
                state: {
                    [fieldName]: fullAddress,
                    returnToStep: returnToStep,
                },
            });
        }
    };

    const handleBack = () => {
        navigate(returnPath);
    };

    const handleDetailAddressChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDetailAddress(e.target.value);
    };

    return (
        <div className="app">
            <Header
                title={t("guidePractice")}
                onBack={handleBack}
                showHomebtn={true}
            />

            <div className="medi-guide-title">
                <h2>{t("applyEnterAddr")}</h2>
            </div>

            <div className="medi-guide-content">
                <div className="medi-addr-input">
                    <input
                        className="medi-addr-input-text"
                        type="text"
                        placeholder={t("applyLookBuilding")}
                        value={searchQuery}
                        onChange={handleInputChange}
                        onClick={handleAddressInputClick}
                        readOnly={isAddressConfirmed}
                    />
                </div>

                {/* 검색 결과 */}
                {!isAddressConfirmed && (
                    <div className="medi-addr-result">
                        {addresses.map((address, index) => (
                            <div
                                key={index}
                                className={`medi-addr-result-box ${
                                    selectedAddress === address ? "selected" : ""
                                }`}
                                onClick={() => handleSelectAddress(address)}
                            >
                                <div className="road-address">
                                    {address.roadAddress}
                                </div>
                                <div className="jibun-address">
                                    {address.jibunAddress}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 상세 주소 입력 */}
                {isAddressConfirmed && (
                    <div className="medi-addr-input medi-detail-addr">
                        <input
                            className="medi-addr-input-text"
                            type="text"
                            placeholder={t("applySpecificAddr")}
                            value={detailAddress}
                            onChange={handleDetailAddressChange}
                        />
                    </div>
                )}
            </div>

            <div className="save-button-container">
                <ContinueButton text={t("applyCheck")} onClick={handleNext} />
            </div>
        </div>
    );
};

export default MediAddress1;
