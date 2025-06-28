import { Link } from 'react-router-dom';
import '../assets/sass/module/CardItem.scss';
import { formatUSD } from '../utils';

function CardItem(props) {
    const {
        isFull = false,
        isFull2 = false,
        isFull3 = false,
        to = '/',
        src,
        title,
        name,
        output,
        capsuleSize,
        machineDimension,
        shippingWeight,
        dies,
        maxPressure,
        maxTabletDiameterMM,
        maxDepthOfFillMM,
        productionCapacity,
        machineSize,
        netWeightKG,
        airPressure,
        airVolume,
        fillingSpeedBPM,
        fillingRangeML,
        price,
    } = props;

    return (
        <Link to={to} className="block w-full h-full">
            <div>
                <div>
                    <div>
                        {/* Ảnh sản phẩm */}
                        <div className="w-full h-[200px] overflow-hidden">
                            <img src={src} alt="preview product" className="w-full h-full object-cover" />
                        </div>

                        {/* Thông tin sản phẩm */}
                        <div className="bg-gray-100 p-4">
                            <p className="text-sm text-gray-500 uppercase">{title}</p>
                            <h3 className="text-lg font-semibold mt-1 line-clamp-2">{name}</h3>

                            {isFull && (
                                <p className="pt-3 text-sm space-y-1">
                                    <strong>Output:</strong> {output} capsules/hour
                                    <br />
                                    <strong>Capsule size:</strong> {capsuleSize} mm
                                    <br />
                                    <strong>Machine dimension:</strong> {machineDimension} mm
                                    <br />
                                    <strong>Shipping weight:</strong> {shippingWeight} kg
                                </p>
                            )}

                            {isFull2 && (
                                <p className="pt-3 text-sm space-y-1">
                                    <strong>Dies:</strong> {dies} sets
                                    <br />
                                    <strong>Max Pressure:</strong> {maxPressure} kN
                                    <br />
                                    <strong>Max Diameter:</strong> {maxTabletDiameterMM} mm
                                    <br />
                                    <strong>Max Depth of Fill:</strong> {maxDepthOfFillMM} mm
                                    <br />
                                    <strong>Production Capacity:</strong> {productionCapacity} pill/h
                                    <br />
                                    <strong>Machine Size:</strong> {machineSize} mm
                                    <br />
                                    <strong>Net Weight:</strong> {netWeightKG} kg
                                </p>
                            )}

                            {isFull3 && (
                                <p className="pt-3 text-sm space-y-1">
                                    <strong>Air Pressure:</strong> {airPressure} bar
                                    <br />
                                    <strong>Air Volume:</strong> {airVolume} m³/min
                                    <br />
                                    <strong>Filling Speed:</strong> {fillingSpeedBPM} bottles/min
                                    <br />
                                    <strong>Filling Range:</strong> {fillingRangeML} ml
                                </p>
                            )}

                            <p className="mt-2 text-red-600 font-semibold text-base">{formatUSD.format(price)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default CardItem;
