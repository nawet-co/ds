import type {
  Density,
  Direction,
  MotionPreference,
  ThemePreference,
} from "@nawet/ds-core";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@nawet/ds-react/components/alert";
import { Badge } from "@nawet/ds-react/components/badge";
import { Button } from "@nawet/ds-react/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@nawet/ds-react/components/card";
import { Input } from "@nawet/ds-react/components/input";
import { NawetProvider } from "@nawet/ds-react/components/providers";
import { useState } from "react";

const themes: ThemePreference[] = ["system", "light", "dark"];
const directions: Direction[] = ["ltr", "rtl"];
const densities: Density[] = ["compact", "default", "comfortable"];
const motions: MotionPreference[] = ["system", "full", "reduced"];

interface OptionGroupProps<T extends string> {
  label: string;
  onChange: (value: T) => void;
  options: T[];
  value: T;
}

const OptionGroup = <T extends string>({
  label,
  onChange,
  options,
  value,
}: OptionGroupProps<T>) => (
  <div className="flex flex-wrap items-center gap-2">
    <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
      {label}
    </span>
    {options.map((option) => (
      <Button
        key={option}
        onClick={() => onChange(option)}
        size="xs"
        variant={value === option ? "default" : "outline"}
      >
        {option}
      </Button>
    ))}
  </div>
);

export const FoundationLab = () => {
  const [theme, setTheme] = useState<ThemePreference>("dark");
  const [direction, setDirection] = useState<Direction>("ltr");
  const [density, setDensity] = useState<Density>("default");
  const [motion, setMotion] = useState<MotionPreference>("system");

  return (
    <NawetProvider
      density={density}
      direction={direction}
      motion={motion}
      theme={theme}
      toaster={false}
    >
      <div className="space-y-10">
        <section className="space-y-4">
          <div className="bg-card text-card-foreground flex flex-col gap-3 rounded-2xl border p-4">
            <OptionGroup
              label="Theme"
              onChange={setTheme}
              options={themes}
              value={theme}
            />
            <OptionGroup
              label="Direction"
              onChange={setDirection}
              options={directions}
              value={direction}
            />
            <OptionGroup
              label="Density"
              onChange={setDensity}
              options={densities}
              value={density}
            />
            <OptionGroup
              label="Motion"
              onChange={setMotion}
              options={motions}
              value={motion}
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2>Raw HTML typography</h2>
          <p className="text-muted-foreground max-w-2xl">
            Raw elements inherit the system type scale. Headings, links, inline
            code, and blockquotes should look intentional without utility
            classes.
          </p>

          <article className="bg-card text-card-foreground space-y-4 rounded-2xl border p-6">
            <h1>Heading one</h1>
            <h2>Heading two</h2>
            <h3>Heading three</h3>
            <h4>Heading four</h4>
            <h5>Heading five</h5>
            <h6>Heading six</h6>
            <p>
              This is a paragraph with <strong>strong emphasis</strong>, a{" "}
              <a href="https://example.com">link</a>, and inline{" "}
              <code>code</code>.
            </p>
            <blockquote>
              Consistency comes from the smallest details repeating correctly.
            </blockquote>
            <ul>
              <li>Raw list item one</li>
              <li>Raw list item two</li>
            </ul>
            <pre>
              <code>{`const answer = 42;\nconsole.log(answer);`}</code>
            </pre>
          </article>
        </section>

        <section className="space-y-4">
          <h2>Components</h2>
          <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Configured surface</CardTitle>
                <CardDescription>
                  The same card under the current theme and density.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <label className="block text-sm font-medium" htmlFor="email">
                  Email
                </label>
                <Input id="email" placeholder="you@example.com" />
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Alert>
                <AlertTitle>Default alert</AlertTitle>
                <AlertDescription>
                  Tokens for states and surfaces are available to every
                  component.
                </AlertDescription>
              </Alert>
              <Alert variant="success">
                <AlertTitle>Success alert</AlertTitle>
                <AlertDescription>
                  Theme, density, direction, and motion are runtime
                  configuration.
                </AlertDescription>
              </Alert>
              <Alert variant="warning">
                <AlertTitle>Warning alert</AlertTitle>
                <AlertDescription>
                  Use the controls above to inspect the system.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </section>
      </div>
    </NawetProvider>
  );
};
