package managers;

import data.Dot;

public class FunctionCalc {

    private boolean isInCircle(Dot dot) {
        return dot.getX() <= 0 && dot.getY() <= 0 &&
                (dot.getX() * dot.getX() + dot.getY() * dot.getY() <= (dot.getR() / 2) * (dot.getR() / 2));
    }

    private boolean isInTriangle(Dot dot) {
        return dot.getX() >= 0 && dot.getY() <= 0 &&
                dot.getX() <= dot.getR() &&
                dot.getY() >= dot.getX() - dot.getR();
    }

    private boolean isInRectangle(Dot dot) {
        return dot.getX() >= 0 && dot.getY() >= 0 &&
                dot.getX() <= dot.getR() && dot.getY() <= dot.getR();
    }

    public boolean isInTheSpot(Dot dot) throws Exception {
        if (dot != null) {
            if (dot.getY() < -5 || dot.getY() > 5 || dot.getX() < -5 || dot.getX() > 5 || dot.getR() < 1 || dot.getR() > 5) {
                throw new Exception("Invalid value: X, Y, or R is out of bounds");
            }

            return isInCircle(dot) || isInTriangle(dot) || isInRectangle(dot);
        }
        throw new Exception("Invalid JSON data");
    }
}
