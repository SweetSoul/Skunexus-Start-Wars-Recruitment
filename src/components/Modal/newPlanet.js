import { useState } from "react";
import { Button, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from "reactstrap";
import useNotification from '../../hooks/useNotification';
import formatString, { CAPITALIZE } from "../../utils/formatString";
import { useDispatch, useSelector } from "react-redux";
import { addPlanet } from "../../store/slices/galaxySlice";
import { updateSettings } from "../../store/slices/settingsSlice";

export default function NewPlanetModal() {
    const [name, setName] = useState("");
    const [nameInvalid, setNameInvalid] = useState(false);
    const [rotation, setRotation] = useState();
    const [rotationInvalid, setRotationInvalid] = useState(false);
    const [orbital, setOrbital] = useState();
    const [orbitalInvalid, setOrbitalInvalid] = useState(false);
    const [diameter, setDiameter] = useState();
    const [diameterInvalid, setDiameterInvalid] = useState(false);
    const [climate, setClimate] = useState("");
    const [climateInvalid, setClimateInvalid] = useState(false);
    const [gravity, setGravity] = useState("");
    const [gravityInvalid, setGravityInvalid] = useState(false);
    const [terrain, setTerrain] = useState("");
    const [terrainInvalid, setTerrainInvalid] = useState(false);
    const [surfaceWater, setSurfaceWater] = useState();
    const [surfaceWaterInvalid, setSurfaceWaterInvalid] = useState(false);

    const settings = useSelector(state => state.settings);
    const dispatch = useDispatch();
    const notify = useNotification();

    const terrainOptions = ['desert', 'jungle', 'lava', 'mountains', 'ocean', 'rainforest', 'swamp', 'tundra',
        'cityscape', 'volcanic', 'wasteland', 'water', 'forests', 'gas giant', 'lakes', 'grassy hills'];

    const checkFields = () => {
        if (name.length < 1) {
            setNameInvalid(true);
        }
        if (rotation.length < 1) {
            setRotationInvalid(true);
        }
        if (orbital.length < 1) {
            setOrbitalInvalid(true);
        }
        if (diameter.length < 1) {
            setDiameterInvalid(true);
        }
        if (climate.length < 1) {
            setClimateInvalid(true);
        }
        if (gravity.length < 1) {
            setGravityInvalid(true);
        }
        if (terrain.length < 1) {
            setTerrainInvalid(true);
        }
        if (surfaceWater.length < 1) {
            setSurfaceWaterInvalid(true);
        }
        if (name.length > 0 && rotation.length > 0 && orbital.length > 0 && diameter.length > 0 && climate.length > 0 && gravity.length > 0 && terrain.length > 0 && surfaceWater.length > 0) {
            const planet = {
                name,
                rotation_period: rotation,
                orbital_period: orbital,
                diameter,
                climate,
                gravity,
                terrain,
                surface_water: surfaceWater,
            };
            dispatch(addPlanet(planet));
            dispatch(updateSettings({ modal: { newPlanet: false } }));
            return notify("Planet added successfully", "Success", "success");
        }
    };

    const handleToggle = () => {
        dispatch(updateSettings({ modal: { newPlanet: !settings.modal.newPlanet } }));
    };

    return <Modal isOpen={settings.modal.newPlanet} toggle={handleToggle} unmountOnClose>
        <ModalHeader toggle={handleToggle}>New Planet</ModalHeader>
        <ModalBody>
            {/* This form could be a reusable component, but since we are not using it anywhere else, I didn't create it as that */}
            <Form onSubmit={checkFields}>
                <FormGroup className="position-relative">
                    <Label for="name">Name</Label>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                        invalid={nameInvalid}
                        onChange={(e) => {
                            setName(e.target.value);
                            setNameInvalid(false);
                        }}
                        value={name}
                    />
                    <FormFeedback tooltip className="right-0">
                        Field required
                    </FormFeedback>
                </FormGroup>
                <FormGroup className="position-relative">
                    <Label for="rotation_period">Rotation Period</Label>
                    <Input
                        type="number"
                        name="rotation_period"
                        id="rotation_period"
                        placeholder="Rotation Period"
                        invalid={rotationInvalid}
                        onChange={(e) => {
                            setRotation(e.target.value);
                            setRotationInvalid(false);
                        }}
                        value={rotation}
                    />
                    <FormFeedback tooltip className="right-0">
                        Field required and must be a number
                    </FormFeedback>
                </FormGroup>
                <FormGroup className="position-relative">
                    <Label for="orbital_period">Orbital Period</Label>
                    <Input
                        type="number"
                        name="orbital_period"
                        id="orbital_period"
                        placeholder="Orbital Period"
                        invalid={orbitalInvalid}
                        onChange={(e) => {
                            setOrbital(e.target.value);
                            setOrbitalInvalid(false);
                        }}
                        value={orbital}
                    />
                    <FormFeedback tooltip className="right-0">
                        Field required and must be a number
                    </FormFeedback>
                </FormGroup>
                <FormGroup className="position-relative">
                    <Label for="diameter">Diameter</Label>
                    <Input
                        type="number"
                        name="diameter"
                        id="diameter"
                        placeholder="Diameter"
                        invalid={diameterInvalid}
                        onChange={(e) => {
                            setDiameter(e.target.value);
                            setDiameterInvalid(false);
                        }}
                        value={diameter}
                    />
                    <FormFeedback tooltip className="right-0">
                        Field required and must be a number
                    </FormFeedback>
                </FormGroup>
                <FormGroup className="position-relative">
                    <Label for="climate">Climate</Label>
                    <Input
                        type="text"
                        name="climate"
                        id="climate"
                        placeholder="Climate"
                        invalid={climateInvalid}
                        onChange={(e) => {
                            setClimate(e.target.value);
                            setClimateInvalid(false);
                        }}
                        value={climate}
                    />
                    <FormFeedback tooltip className="right-0">
                        Field required
                    </FormFeedback>
                </FormGroup>
                <FormGroup className="position-relative">
                    <Label for="gravity">Gravity</Label>
                    <Input
                        type="text"
                        name="gravity"
                        id="gravity"
                        placeholder="Gravity"
                        invalid={gravityInvalid}
                        onChange={(e) => {
                            setGravity(e.target.value);
                            setGravityInvalid(false);
                        }}
                        value={gravity}
                    />
                    <FormFeedback tooltip className="right-0">
                        Field required
                    </FormFeedback>
                </FormGroup>
                <FormGroup className="position-relative">
                    <Label for="exampleSelect">
                        Terrain
                    </Label>
                    <Input
                        id="terrainSelect"
                        name="terrainSelect"
                        type="select"
                        invalid={terrainInvalid}
                        onChange={(e) => {
                            setTerrain(e.target.value);
                            setTerrainInvalid(false);
                        }}
                        value={terrain}
                    >
                        <option value="">Select a terrain</option>
                        {terrainOptions.map(option => <option key={option}>{formatString(option, CAPITALIZE)}</option>)}
                    </Input>
                    <FormFeedback tooltip className="right-0">
                        Field required
                    </FormFeedback>
                </FormGroup>
                <FormGroup className="position-relative">
                    <Label for="surface_water">Surface Water</Label>
                    <Input
                        type="number"
                        name="surface_water"
                        id="surface_water"
                        placeholder="Surface Water"
                        value={surfaceWater}
                        invalid={surfaceWaterInvalid}
                        onChange={(e) => {
                            setSurfaceWater(e.target.value);
                            setSurfaceWaterInvalid(false);
                        }}
                    />
                    <FormFeedback tooltip className="right-0">
                        Field required and must be a number
                    </FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Button color="dark" type="button" onClick={checkFields} className="w-100">Submit</Button>
                </FormGroup>
            </Form>

        </ModalBody>
    </Modal>;
}