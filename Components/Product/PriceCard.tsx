import Image from "next/image";

interface props {
    title: string;
    iconSrc: string;
    value: string;
}

const PriceCard: React.FC<props> = ({ title, iconSrc, value }) => {
    return (
        <div className={`price-info_card`}>
            <p className="text-base text-black-100 dark:text-white">{title}</p>

            <div className="flex gap-1">
                <Image src={iconSrc} alt={title} width={24} height={24} />

                <p className="text-2xl font-bold text-secondary dark:text-gray-200">{value}</p>
            </div>
        </div>
    );
};

export default PriceCard;