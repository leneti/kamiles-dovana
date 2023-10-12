import { useState, useEffect } from "react";
import { Image, Container, Title, Button, Text, Stack, rem } from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import image from "/hat.jpg";
import qr from "/qr-code-tw.png";
import classes from "./HeroBullets.module.css";

export function HeroBullets() {
  const [answer, setAnswer] = useState("");
  const [timer, setTimer] = useState(5);
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLImageElement>({
    offset: 60,
  });

  useEffect(() => {
    if (answer === "no" && timer > 0) {
      const id = setTimeout(() => setTimer((p) => p - 1), 1000);
      return () => clearTimeout(id);
    } else if (answer === "no") {
      setAnswer("-yes");
    } else {
      scrollIntoView({
        alignment: "end",
      });
    }
  }, [answer, timer]);

  return (
    <Container my="xl">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            Su<span className={classes.highlight}>gimtadieniuu,</span>Kamile!
          </Title>
          <Text c="dimmed" mt="md">
            Linkim smagaus gimtadienio, sėkmingai pasibaigti mokslus, gerai atsipalaiduoti
            panaudojus dovaną iiiiiir laukiam nesulaukiam kelionės į šiltus kraštus!
          </Text>

          <Stack mt={30} align="center">
            <Button
              radius="xl"
              color="#ffc801"
              c="black"
              size="md"
              maw={rem(320)}
              onClick={() => setAnswer("yes")}
            >
              Kaip netikėta, ačiū jums draugai!
            </Button>
            <Button
              variant="default"
              radius="xl"
              size="md"
              maw={rem(320)}
              onClick={() => setAnswer("no")}
            >
              Ne, ačiū, sakiau nenoriu dovanų
            </Button>
          </Stack>
        </div>

        <Image src={image} className={classes.image} />
      </div>

      <Stack py="xl" align="center">
        {answer === "-yes" && <Text>Bajeris! Vis tiek gausi dovanų 🎁</Text>}
        {answer === "no" && (
          <Text>Tau nereik, mum nereik{Array.from({ length: timer }).map(() => " .")}</Text>
        )}
        {answer.includes("yes") && (
          <>
            <Text>Paspausk arba nuskenuok koduką 🎀</Text>
            <a
              target="_blank"
              href="https://www.treatwell.lt/egift-card/oT1325896172.g1.x49EB6D41.pdf?utm_source=wahanda-email&utm_medium=email&utm_campaign=wahanda-egift-card&utm_term=259d6a89-6875-458a-9f29-0fe934e3d7ee"
            >
              <Image src={qr} className={classes.qr} ref={targetRef} />
            </a>
          </>
        )}
      </Stack>
    </Container>
  );
}
