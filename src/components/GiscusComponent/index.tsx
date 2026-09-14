import React from 'react';
import Giscus from '@giscus/react';
import { useColorMode } from '@docusaurus/theme-common';

export default function GiscusComponent() {
  const { colorMode } = useColorMode();

  return (
    // repo renamed ud-docs → udctl on 2026-09-12 (epic f02f82bb); giscus looks the
    // repo up BY NAME, so the old name rendered "giscus is not installed on this
    // repository" at the bottom of every docs/blog page. repoId/categoryId are
    // GraphQL node ids and survive renames — only the name needed to move.
    <Giscus
      repo="oatnil-top/udctl"
      repoId="R_kgDOP2ePGA"
      category="General"
      categoryId="DIC_kwDOP2ePGM4CxLLp"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={colorMode}
      lang="en"
      loading="lazy"
    />
  );
}
