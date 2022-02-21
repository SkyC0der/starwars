import { Placeholder } from "react-bootstrap"

export default function Loader() {
    return (
        <div className="loader">
            <Placeholder as="p" lg={12} animation="glow"  >
                <Placeholder.Button lg={12} bg="secondary" />
            </Placeholder>

            <Placeholder as="p" lg={12} animation="glow"  >
                <Placeholder.Button lg={12} bg="secondary" />
            </Placeholder>

            <Placeholder as="p" lg={12} animation="glow"  >
                <Placeholder.Button lg={12} bg="secondary" />
            </Placeholder>

            <Placeholder as="p" lg={12} animation="glow"  >
                <Placeholder.Button lg={12} bg="secondary" />
            </Placeholder>

            <Placeholder as="p" lg={12} animation="glow"  >
                <Placeholder.Button lg={12} bg="secondary" />
            </Placeholder>

            <Placeholder as="p" lg={12} animation="glow"  >
                <Placeholder.Button lg={12} bg="secondary" />
            </Placeholder>
        </div>
    )
}